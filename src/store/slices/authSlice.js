// authSlice
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut, onAuthStateChanged} from "firebase/auth";

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth, db } from "../../config/firebase";
import { addDoc ,collection,doc,  getDoc, getDocs, setDoc} from "firebase/firestore";


export const getCurrentUser = createAsyncThunk(
    "auth/currentUser",
    async (setLoading, store)=>{
        try {
            setLoading(true)
            onAuthStateChanged(auth,async(user) => {
                if (user) {
                  const uid = user.uid;
                  const docSnap = await getDoc(doc(db, "users",uid))
                  const dbUser = docSnap?.data()
                  store.dispatch(setUser(dbUser))
                //   console.log("dbUser",dbUser);
                  setLoading(false)
                } else{
                    setLoading(false)
                }
              });
              return 
        } catch (error) {
            setLoading(false)
            console.log(error);
            
        }
         
    }
)

export const logout= createAsyncThunk(
    "auth/logout",
    async ()=>{
        try {
            await signOut(auth)
            return true
        } catch (error) {
            console.log(error);
            
        }
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async (user) => {

        try {
            // console.log("user",user);
            
         const userCredential =   await signInWithEmailAndPassword(auth, user.email, user.password)
        //  console.log("userCredential in login",userCredential.user.uid);
         
         const docSnap = await getDoc(doc(db, "users",userCredential.user.uid))
         const dbUser = docSnap?.data()
        //  console.log("dbUser",dbUser);
         
         return dbUser


        } catch (error) {
            alert("please Enter valid Email and Password, or please signup")
             console.log("error",error);
             
        }
        
    }
)



export const allusers = createAsyncThunk(
    'auth/allusers',
    async () => {
        try {
            // Reference the "users" collection
            const usersCollection = collection(db, "users");

            // Fetch all documents from the "users" collection
            const querySnapshot = await getDocs(usersCollection);

            // Map through the documents and extract data
            const allusers = querySnapshot.docs.map(doc => ({
                id: doc.id, // Include document ID if needed
                ...doc.data()
            }));

            // console.log("allusers", allusers);
            return allusers;

        } catch (error) {
            console.error("Error fetching users:", error);
            throw error; // Ensure error propagates if needed
        }
    }
);


export const signup  = createAsyncThunk(
    "auth/signup",
    async(user)=>{
        try {
            // console.log("user in signup action", user);
            const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);


            const file = user.file;
            // console.log("file", file);
            const data = new FormData();
            
            data.append("file", file);
            data.append("upload_preset","facelinkUsers")
            data.append("cloud_name","dihao3fxp")
            const res = await fetch("https://api.cloudinary.com/v1_1/dihao3fxp/upload", {
                method: "POST",
                body: data,
            })
            const result = await res.json()
            // console.log("result", result.url);
            const url = result.url;


            let saveUserTodb = {
                email: user.email,
                
                name: user.name,
                address: user.address,
                phone: user.phone,
                gender: user.gender,
                ImageURL: url,
                uid: userCredential.user.uid,
            }

            await setDoc(doc(db, "users", userCredential.user.uid), saveUserTodb);
            // console.log("user saved successfully")
              return saveUserTodb
              
        }catch(error){
            console.log("error", error);
            throw error;
        }
    }
)

const initialState = {
    user: null,
    allUsers: null,

}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            // console.log("reducer in setuser", action.payload);
            
            state.user = action.payload
        }
    },
extraReducers:(builder)=>{
    builder.addCase(signup.fulfilled, (state,action)=>{
        // console.log("action", action.payload);
        state.user = action.payload
    })

    builder.addCase(login.fulfilled, (state,action)=>{
        // console.log("action in login", action.payload);
        state.user = action.payload
    })

    builder.addCase(logout.fulfilled, (state,action)=>{
        // console.log("action in login", action.payload);
        state.user = null
    })

    builder.addCase(getCurrentUser.fulfilled, (state,action)=>{
        // console.log("reducer case in login", action.payload);
        state.user = action.payload
    })
    builder.addCase(allusers.fulfilled, (state,action)=>{
        // console.log("reducer case in allusers", action.payload);
        state.allUsers = action.payload
    })
}
});

export const { setUser } = authSlice.actions
export default authSlice.reducer
