const BasePage=require("../Pages/BasePage");
const HomePage=require("../Pages/HomePage");
const RepositoriesPage=require("../Pages/RepositoriesPage");

describe("Testing Github",()=>{
   const gitHubPage=new BasePage();   
    const gitHomePage=new HomePage();
    const gitRepositoriesPage=new RepositoriesPage();
    let randomNumber;
    beforeEach(async()=>{
        reporter
            .description("Login should work")
            .story("Login functionality");
        await gitHubPage.openGitHub();
        reporter.startStep("Logging into Github");
        await gitHubPage.signInGitHub();
        reporter.endStep();
    });
    it("Verify whether user is able to login Github",async()=>{ 
        reporter
            .description("Username should be same as login user")
            .story("Username verification");
        reporter.startStep("Verifying user name");
        await gitHomePage.verifyUserName('saranyababu2005');     
        reporter.endStep();
    });
    it("Verify Menu options are available",async()=>{
        reporter
            .description("UI verification - Menus are available")
            .story("UI verification");
        reporter.startStep("Verify the menus are available");
        await gitHomePage.verifyMenuIsAvailable();
        reporter.endStep();
    });
    it("Verify number and name of Repostiories",async()=>{
        reporter
            .description("Verify number and name of Repositories")
            .story("Repositories Verification");
        reporter.startStep("Verify number and name of Repostiories");
        await gitRepositoriesPage.verifyRepositoryList();
        reporter.endStep();
    });
    it("Verify creating new repository from API",async()=>{
        reporter
            .description("Creating repository from API and checking in UI")
            .story("Create API verification");
        randomNumber=await gitRepositoriesPage.randomNumberGeneration();
        reporter.startStep("Creating Repository from API");
        await gitRepositoriesPage.createNewRepository('testing'+randomNumber);
        reporter.endStep();
        reporter.startStep("Verifying the same repository is displayed in UI");
        await gitRepositoriesPage.verifyRepositoryList();
        reporter.endStep();
    });
    it("Verify repository can be updated from API",async()=>{
        reporter
            .description("Updating the existing repository from API")
            .story("Update API verification");
        reporter.startStep("Updating repository from API");
       const updatedRepositoryName= await gitRepositoriesPage.updateRepository('testing'+randomNumber);
       reporter.endStep();
       reporter.startStep("Verifying the same repository is updated in UI");
       await gitRepositoriesPage.verifyParticularRepositoryExist('testing'+randomNumber,updatedRepositoryName);
       reporter.endStep();
    });
    afterEach(async()=>{
        reporter
        .description("Logout should work")
        .story("Logout functionality");
        reporter.startStep("Logging out of Github");
        await gitHubPage.signOutGitHub();
        reporter.endStep();
        await gitHubPage.closeGitHub();   
    });   
})