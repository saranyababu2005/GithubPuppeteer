
import {find} from 'puppeteer-testing-library';
import 'puppeteer-testing-library/extend-expect';
import BasePage from './BasePage';
const credentials=require('./Credentials');

const profileMenu={role:'combobox',name:'View profile and more'};
const lblUserName="a[class='no-underline user-profile-link px-3 pt-2 pb-2 mb-n2 mt-n1 d-block']>.css-truncate-target";
const pullRequests={role:'link',name:'Pull requests you created'};
const issues={role:'link',name:'Issues you created'};
const marketPlace={role:'link',name:'Marketplace'};
const explore={role:'link',name:'Explore'};
class HomePage extends BasePage{
 
    async verifyUserName(loggedInUserName){
        await (await find(profileMenu)).click();  
        await page.waitForSelector(lblUserName);
        const txtUserName=await page.$eval(lblUserName,(e)=>e.innerText);
        console.log(txtUserName);
       try{
            await expect(txtUserName).toEqual(loggedInUserName);            
      }
       catch(error){
            await (await find(profileMenu)).click(); 
            await page.screenshot({path:'./UserProfile.png'});              
            throw new Error(error.message);        
        }      
        await (await find(profileMenu)).click(); 
    }
    async verifyMenuIsAvailable(){
        await expect(await find(pullRequests)).toBeVisible;
        await expect(await find(issues)).toBeVisible;
        await expect(await find(marketPlace)).toBeVisible;
        await expect(await find(explore)).toBeVisible;
    }
}
module.exports=HomePage;