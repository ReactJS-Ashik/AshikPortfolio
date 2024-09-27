import axios from "axios";

const hostType= "https://nexus3-render.onrender.com"
// const hostType= "http://localhost:7700"
const API_Version= "v1"

// Github API calls
const getGitHubUserData= async () => {
    try{
        const response= await axios.get(`${hostType}/api/${API_Version}/my-github/userdata`)
        return JSON.stringify(response);
    } catch (error) {
        console.error("Error while getting the medium uset Data", error.response.data)
        throw error;
    }
}
const getGitHubRepoData= async () => {
    try{
        const response = await axios.get(`${hostType}/api/${API_Version}/my-github/repository-list`)
        return JSON.stringify(response)
    }catch (error){
        console.log("Error while getting the list of GitHub repo",error)
        throw error;
    }
}



// Medium API calls
const getMediumUserData= async () => {
    try{
        const response= await axios.post(`${hostType}/api/${API_Version}/my-medium/userdata`)
        // const response= await axios.post(`${hostType}/api/${API_Version}/my-medium/userdata`)
        return JSON.stringify(response);
    } catch (error) {
        console.error("Error while getting the medium user Data", error.response.data)
        throw error;
    }
}


const getMediumUserArticleData= async () => {
    try{
        const response= await axios.post(`${hostType}/api/${API_Version}/my-medium/user-article-data`)
        // const response= await axios.post(`${hostType}/api/${API_Version}/my-medium/user-article-data`)
        console.log("article data",response)
        return JSON.stringify(response);
    } catch (error) {
        console.error("Error while getting the medium uset Data", error.response.data)
        throw error;
    }
}

export {getMediumUserData, getMediumUserArticleData, getGitHubUserData, getGitHubRepoData};