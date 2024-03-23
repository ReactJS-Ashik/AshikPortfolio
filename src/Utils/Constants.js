import house from "../resources/svgs/house-light.png"
import social from "../resources/svgs/social-light.png"
import exp from "../resources/svgs/experience-light.png"
import projects from "../resources/svgs/projects-light.png"

import MediumLogo from "../resources/Images/medium_logo.png"
import MediumText from "../resources/Images/medium.png"
import GitHubLogo from "../resources/Images/github_logo.png"
import GitHubText from "../resources/Images/github.png"
import LinkedInLogo from "../resources/Images/linked_logo.png"
import LinkedInText from "../resources/Images/linkedin.png"
import PinterestLogo from "../resources/Images/pinterest_logo.png"
import PinterestText from "../resources/Images/pinterest.png"


export const sideNavMenus= [
    {title: "Home", link: "my-home", icon: house},
    {title: "Bio", link: "my-bio", icon: house},
    {title: "Social", link: "my-social-profile", icon: social},
    {title: "Experience", link: "my-experience", icon: exp},
    {title: "Projects", link: "my-projects", icon: projects},
]

export const socialLinks= {
    pinterest: "https://in.pinterest.com/ashikthulungrai7/",
    medium: "https://medium.com/@ashikthulungrai7",
    github: "https://github.com/ashikrai",
    linkedin: "https://www.linkedin.com/in/ashik-rai/",
}

export const socialComponentItems= [
    {title: "Medium", link: socialLinks["medium"], logo: MediumLogo, logoText: MediumText, color: 'purple'},
    {title: "GitHub", link: socialLinks["github"], logo: GitHubLogo, logoText: GitHubText, color: 'green'},
    {title: "LinkedIn", link: socialLinks["linkedin"], logo: LinkedInLogo, logoText: LinkedInText, color: 'blue'},
    {title: "Pinterest", link: socialLinks["pinterest"], logo: PinterestLogo, logoText: PinterestText, color: 'pink'},
]


export const udDirection= "Vertical"
export const lrDirection= "Horizontal"


export const bio= "A Software engineer with knowledge on a variety of tools and technologies related to the Payment Domain (Verifone) and FullStack (Lokibots) using technologies such as C++, ReactJS, NodeJS, Redux, GraphQL, etc (knowledge of C, Python, Java, ReactNative). Open to exploring newer fields of work to learn and grow, and pursue a career that provides continuous learning opportunities. Detail-oriented, organized and meticulous employee. Works at fast pace to meet tight deadlines. Enthusiastic team player ready to contribute to company success."
export const myEmail= "ashikthulungrai7@gmail.com"



// Defining Constants used in the Code

export const DarkTheme              = "dark"
export const LightTheme             = "light"

export const drawerWidth            = 300;
export const smalldrawerWidth       = 300;
export const closedrawerWidth       = 0;

