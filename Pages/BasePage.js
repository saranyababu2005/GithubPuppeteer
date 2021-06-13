import { launchArgs } from 'puppeteer-testing-library';
import {find} from 'puppeteer-testing-library';
import 'puppeteer-testing-library/extend-expect';
const puppeteer=require('puppeteer');
const credentials=require('./Credentials');

const signIn={role:'link',name:'Sign in'};
const userName={role:'textbox',name:'Username or email address'};
const password={role:'textbox',name:'Password'};
const btnSignIn={role:'button',name:'Sign in'};
const signOut={role:'menuitem',name:'Sign out'};
const profileMenu={role:'combobox',name:'View profile and more'};
let browser;
let page;
let randomNumber;
class BasePage{    
    async openGitHub(){        
         global.browser=  await puppeteer.launch({headless:false,args:launchArgs(['--start-fullscreen'])});
         global.page=   await global.browser.newPage();
         await global.page.setViewport({width:1500,height:1500,slowMo:50});       
         await global.page.goto('https://github.com');                
    }
    async closeGitHub()
    {
        await global.browser.close();
    }   
    async signInGitHub()
    {            
        await (await find(signIn)).click();
        await (await find(userName)).type(credentials.userId,{delay:14});
        await (await find(password)).type(credentials.password);
        await (await find(btnSignIn)).click();     
     
    }    
    async signOutGitHub()
    {       
        await (await find(profileMenu)).click();     
        await (await find(signOut)).click();   
    }

    async randomNumberGeneration(){
       randomNumber=Math.floor((Math.random()*100)+1);
       console.log(randomNumber);
       return randomNumber;

    }
  
}

module.exports=BasePage;