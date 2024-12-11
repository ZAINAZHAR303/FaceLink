import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection,doc, deleteDoc, getDocs, updateDoc, serverTimestamp, getDoc, arrayRemove, arrayUnion, increment, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
// import { db, storage } from "../../../config/firebase";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const getPosts = createAsyncThunk("product/getitems", async () => {
  try {
    const collectionRef = collection(db, "products",);
    // const queryRef = query(collectionRef, where("title", "!=", "post1"), orderBy("title"), limit(3))
    // one time data read
    const docs = await getDocs(collectionRef);
    let data = [];
    console.log("docs", docs);

    docs.forEach((doc) => {
      // console.log("doc", doc.data());
      // console.log("doc id", doc.id);
      data.push({ id: doc.id, ...doc.data() });
    });
    console.log("data", data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
});




export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (postid, { rejectWithValue }) => {
    try {
      // Reference the collection for the specific post comments
      const commentRef = collection(db, "comments", postid, "comments");

      // Fetch all documents in the comments sub-collection
      const querySnapshot = await getDocs(commentRef);
      console.log(querySnapshot.docs); // Check if docs are being fetched properly

      // Prepare an array to hold the comments with user details
      const commentsWithUserDetails = [];

      // Fetch the user details for each comment by uid
      for (const docSnap of querySnapshot.docs) {
        const commentData = docSnap.data();
        const userRef = doc(db, "users", commentData.uid);
        const userSnap = await getDoc(userRef);

        // Check if user data exists
        if (userSnap.exists()) {
          const userData = userSnap.data();

          // Push the comment and user details into the comments array
          commentsWithUserDetails.push({
            id: docSnap.id,
            comment: commentData.comment,
            user: {
              username: userData.name,
              profileImage: userData.ImageURL,
            },
          });
        }
      }

      // Return the comments along with user details
      return { postid, comments: commentsWithUserDetails };
    } catch (error) {
      console.error("Error fetching comments:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const updateComment = createAsyncThunk(
  "product/updateComment",
  async ({postid, comment, uid}) => {
    try {
      let commentdata = {
        comment: comment,
        createAt : serverTimestamp(),
        uid: uid,
      }
      // const productRef = ;
      const commentRef = collection(db, "comments", postid, "comments");  // comments/{postid}/comments
      await addDoc(commentRef, commentdata);
      return { postid, commentdata };
    }
    catch (error) {
      console.log("error", error);
    }
  }
)
export const updateLike = createAsyncThunk(
  "product/updateLike",
  async ({ productId, uid }, thunkAPI) => {
    try {
      const productRef = doc(db, "products", productId);
      const productDoc = await getDoc(productRef);

      if (!productDoc.exists()) {
        throw new Error("Product not found");
      }

      const productData = productDoc.data();
      const alreadyLiked = productData.likedBy?.includes(uid);

      if (alreadyLiked) {
        // If user already liked, decrement the like count and remove UID
        await updateDoc(productRef, {
          like: increment(-1),
          likedBy: arrayRemove(uid),
        });
      } else {
        // If user hasn't liked, increment the like count and add UID
        await updateDoc(productRef, {
          like: increment(1),
          likedBy: arrayUnion(uid),
        });
      }

      // Return updated product data for local state update
      return {
        id: productId,
        like: alreadyLiked ? productData.like - 1 : productData.like + 1,
        likedBy: alreadyLiked
          ? productData.likedBy.filter((id) => id !== uid)
          : [...(productData.likedBy || []), uid],
      };
    } catch (error) {
      console.error("Error updating like:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updatePost = createAsyncThunk(
    "product/updatePost",
    async (post) => {

        try {
            const docRef = doc(db, "products", post.id)
            await updateDoc(docRef, post)
            console.log("document successfully updated! in action");
            return post;
           
        } catch (error) {
            console.log("error", error);
        }
    })

export const createPost = createAsyncThunk(
    "product/createPost",
    async (post) => {

        try {
            post.setLoading(true);
            const file = post.file;
            console.log("file", file);

            post.fileType = file.type;
            console.log("filetype in action" , post.fileType)
            const data = new FormData();
            
            data.append("file", file);
            data.append("upload_preset","facelinkUsers")
            data.append("cloud_name","dihao3fxp")
            const res = await fetch("https://api.cloudinary.com/v1_1/dihao3fxp/upload", {
                method: "POST",
                body: data,
            })
            const result = await res.json()
            console.log("result", result.url);
            const url = result.url;
         
            
            let updatedPost  = {
                
                like: post.like,
                postText: post.postText,
                createdAt: serverTimestamp() ,
                imageURL: url || "",
                fileType: post.fileType || "",
                uid: post.uid,
                
            }
            const collectionRef = collection(db, "products")
            const response = await addDoc(collectionRef, updatedPost)
            console.log("response after firebase store", response);
            post.setLoading(false);
            return {...updatedPost,id:response.id}
        } catch (error) {
           
            console.log("error", error);

        }


        return post


    }
)

export const deletePost = createAsyncThunk(
    "product/deletePost",
    async (id) => {
        try {
          const docRef = doc(db, "products", id)

            await deleteDoc(docRef)
            return id;
            console.log("document successfully deleted! in action");
        } catch (error) {
            console.log("error", error);
        }
      

    }
    
  )


const feedSlice = createSlice({
  name: "product",
  initialState: {
    items: [],
    updatePost: null,
    comments: {},
    commentsByPost: {},
  },
  reducers: {
    addProduct: (state, action) => {
      state.items.push(action.payload);
    },
    updateDocid : (state, action) => {
      let post = state.items.filter((post)=> post.id === action.payload)
      state.updatePost = post[0]
      console.log("updateDocid in reducer", post[0]);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.items = action.payload;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
        state.items = [action.payload, ...state.items]
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id!== action.payload);
        console.log("deleted successfully in reducer");
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.items = state.items.map((post) => {
        if (post.id === action.payload.id) {
            return action.payload
        }
        return post
    })
    state.updatePost = null
    });
    builder.addCase(updateLike.fulfilled, (state, action) => {
      state.items = state.items.map((post) => {
        if (post.id === action.payload.id) {
          return {
            ...post,
            like: action.payload.like,
            likedBy: action.payload.likedBy,
          };
        }
        return post;
      });
    });
    builder.addCase(updateComment.fulfilled, (state, action) => {
      state.loading = false;
      const { postid, commentdata } = action.payload;

      // If there are multiple comments per post, we can push the new comment to the array
      if (state.comments[postid]) {
        state.comments[postid].push(commentdata);
      } else {
        state.comments[postid] = [commentdata]; // Create an array if no comments exist for that post
      }
    })
    .addCase(fetchComments.fulfilled, (state, action) => {
      state.status = 'succeeded';
      // Store comments with user details in state
      console.log("comments in extra reducers", action.payload)
      state.commentsByPost = action.payload.comments;
    })

  },
});
export const {updateDocid} = feedSlice.actions
export default feedSlice.reducer;
