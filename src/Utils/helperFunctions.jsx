import GitHubPageComponent from "../Components/SocialComponent/GitHubPage/GitHubPageComponent"
import MediumPageComponent from "../Components/SocialComponent/MediumPage/MediumPageComponent"
import { myEmail } from "./Constants"

export const getSocialComponents = (socialProfile, closeProfile) => {
    switch(socialProfile){
        case "Medium":
            return <MediumPageComponent callback={closeProfile} />
        case "GitHub":
            return <GitHubPageComponent callback={closeProfile} />
        default:
            <MediumPageComponent />
    }
}

export const copyTextToClipBoard= (text) => {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text)
        .then(() => {
        console.log('Text copied to clipboard');
        })
        .catch((error) => {
        console.error('Error copying text: ', error);
        });
    } 
}

export const sendMail= (recipient, cc, subject, body) => {
    let mailtoLink= "";
    if (recipient)
    {
        if (cc){
            console.log("using both")
            mailtoLink = `mailto:${recipient}?cc=${cc}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        }
        else{
            console.log("using only recipient")
            mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        }
    }
    else{
        console.log("recipient is null so using cc")
        mailtoLink = `mailto:?cc=${cc}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
    window.location.href = mailtoLink;
}

export const sendRepoLinkAsMail= (userProfile, RepoName, RepoUrl) => {

    const subject = `Link for Repository: ${RepoName}`;
    const recipient= myEmail
    const body= `Hi,\n 
                Here is the link for the repo: ${RepoName}:\n 
                ${RepoUrl}\n\n
                Read my other Repositories from the below Link
                ${userProfile}
                \n
                Please go through my ReadMe page and explore the GitHub project.
                \n\n
                Thankyou
                `
    // const body= `Hi,\n 
    //     Here is the link for the repo: ${RepoName}:\n 
    //     <a href="${RepoUrl}">${RepoUrl}</a>\n\n
    //     Read my other Repositories from the below Link
    //     <a href="${userProfile}">${userProfile}</a>
    // `
    sendMail(null, recipient, subject, body);
}

export const sendGitHubProfileLinkAsMail= (userData) => {
    const subject = `GitHub User Profile: ${userData.username}`;
    const recipient= myEmail
    const body= `Hi,\n
                Nice to see you. Hope you are doing good.\n
                ${userData.bio}\n
                Here is my GitHub profile link:\n 
                ${userData.url}\n\n
                Please go through my ReadMe page and explore the GitHub project.
                \n\n
                Thankyou
                `
    // const body= `Hi,\n 
    //     Here is the link for the repo: ${RepoName}:\n 
    //     <a href="${RepoUrl}">${RepoUrl}</a>\n\n
    //     Read my other Repositories from the below Link
    //     <a href="${userProfile}">${userProfile}</a>
    // `
    sendMail(null, recipient, subject, body);
}

export const openLink = (link) => {
    if (link)
        window.open(link, '_blank');
}