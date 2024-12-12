import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  doc,
  deleteDoc,
  getDocs,
  updateDoc,
  serverTimestamp,
  getDoc,
  arrayRemove,
  arrayUnion,
  increment,
  setDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { set } from "date-fns";
// import { db, storage } from "../../../config/firebase";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const getPosts = createAsyncThunk(
  "product/getitems",
  async ({ setloading }) => {
    try {
      setloading(true);
      const collectionRef = collection(db, "products");
      const docs = await getDocs(collectionRef);
      let data = [];

      // Loop through each product document
      for (const docSnap of docs.docs) {
        const productData = docSnap.data();

        // Fetch the user details using the uid from the product
        const userRef = doc(db, "users", productData.uid); // Get the reference of the user document
        const userSnap = await getDoc(userRef);

        // If user data exists, get the username and image URL
        let userDetails = { username: "", profileImage: "" };
        if (userSnap.exists()) {
          const userData = userSnap.data();
          userDetails = {
            username: userData.name || "", // Assuming 'name' is the field in the user document
            profileImage: userData.ImageURL || "", // Assuming 'ImageURL' is the field for profile image
          };
        }

        // Push the product data along with user details
        data.push({
          id: docSnap.id,
          ...productData,
          user: userDetails, // Add the user details to the product data
        });
      }

      // Return the updated data with user details
      // console.log("data with user details:", data);
      setloading(false);
      return data;
    } catch (error) {
      setloading(false);
      // console.log("error fetching posts", error);
    }
  }
);

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (postid, { rejectWithValue }) => {
    try {
      // Reference the collection for the specific post comments
      const commentRef = collection(db, "comments", postid, "comments");

      // Fetch all documents in the comments sub-collection
      const querySnapshot = await getDocs(commentRef);
      // console.log(querySnapshot.docs); // Check if docs are being fetched properly

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
            createAt: commentData.createAt,
            user: {
              username: userData.name,
              profileImage: userData.ImageURL,
            },
          });
        }
        // setloading(false);
      }

      // Return the comments along with user details
      return { postid, comments: commentsWithUserDetails };
    } catch (error) {
      // setloading(false);
      console.error("Error fetching comments:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const updateComment = createAsyncThunk(
  "product/updateComment",
  async ({ postid, comment, uid }) => {
    try {
      let commentdata = {
        comment: comment,
        createAt: serverTimestamp(),
        uid: uid,
      };
      // const productRef = ;
      const commentRef = collection(db, "comments", postid, "comments"); // comments/{postid}/comments
      await addDoc(commentRef, commentdata);
      return { postid, commentdata };
    } catch (error) {
      // console.log("error", error);
    }
  }
);
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
      const docRef = doc(db, "products", post.id);
      await updateDoc(docRef, post);
      // console.log("document successfully updated! in action");
      return post;
    } catch (error) {
      // console.log("error", error);
    }
  }
);

export const createPost = createAsyncThunk(
  "product/createPost",
  async (post) => {
    try {
      post.setloading(true);
      // post.setLoading(true);
      const file = post.file;
      // console.log("file", file);

      post.fileType = file.type;
      // console.log("filetype in action", post.fileType);
      const data = new FormData();

      data.append("file", file);
      data.append("upload_preset", "facelinkUsers");
      data.append("cloud_name", "dihao3fxp");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dihao3fxp/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const result = await res.json();
      // console.log("result", result.url);
      const url = result.url;

      let updatedPost = {
        like: post.like,
        postText: post.postText,
        createdAt: serverTimestamp(),
        imageURL: url || "",
        fileType: post.fileType || "",
        uid: post.uid,
      };
      const collectionRef = collection(db, "products");
      const response = await addDoc(collectionRef, updatedPost);
      // console.log("response after firebase store", response);
      const userRef = doc(db, "users", post.uid);
      const userSnap = await getDoc(userRef);
      const userDetails = userSnap.exists()
        ? {
            username: userSnap.data().name || "",
            profileImage: userSnap.data().ImageURL || "",
          }
        : { username: "", profileImage: "" };

      post.setloading(false);
      return { ...updatedPost, id: response.id ,user: userDetails};
    } catch (error) {
      post.setloading(false);
      // console.log("error", error);
    }

    return post;
  }
);

export const deletePost = createAsyncThunk("product/deletePost", async (id) => {
  try {
    const docRef = doc(db, "products", id);

    await deleteDoc(docRef);
    return id;
    // console.log("document successfully deleted! in action");
  } catch (error) {
    // console.log("error", error);
  }
});

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
    updateDocid: (state, action) => {
      let post = state.items.filter((post) => post.id === action.payload);
      state.updatePost = post[0];
      // console.log("updateDocid in reducer", post[0]);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.items = action.payload;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.items = [action.payload, ...state.items];
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      // console.log("deleted successfully in reducer");
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.items = state.items.map((post) => {
        if (post.id === action.payload.id) {
          return action.payload;
        }
        return post;
      });
      state.updatePost = null;
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
    builder
      .addCase(updateComment.fulfilled, (state, action) => {
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
        state.status = "succeeded";
        // Store comments with user details in state
        // console.log("comments in extra reducers", action.payload);
        state.commentsByPost = action.payload.comments;
      });
  },
});
export const { updateDocid } = feedSlice.actions;
export default feedSlice.reducer;
