import axios from "axios";

const getMediumUserData= async (token) => {
    try{
        const response= await axios.post("http://localhost:7700/api/v1/my-medium/userdata")
        // const response= await axios.post("https://nexus3-render.onrender.com/api/v1/my-medium/userdata",{
        //     "token": token
        // })
        return JSON.stringify(response);
    } catch (error) {
        console.error("Error while getting the medium uset Data", error.response.data)
        throw error;
    }
}


const getMediumUserArticleData= async () => {
    try{
        const response= await axios.post("http://localhost:7700/api/v1/my-medium/user-article-data")
        // const response= await axios.post("https://nexus3-render.onrender.com/api/v1/my-medium/user-article-data")
        console.log("article data",response)
        return JSON.stringify(response);
    } catch (error) {
        console.error("Error while getting the medium uset Data", error.response.data)
        throw error;
    }
}

export {getMediumUserData, getMediumUserArticleData};