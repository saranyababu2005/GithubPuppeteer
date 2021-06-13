const fetch=require('node-fetch');
import {find} from 'puppeteer-testing-library';
import 'puppeteer-testing-library/extend-expect';
import BasePage from './BasePage';
const credentials=require('./Credentials');
const profileMenu={role:'combobox',name:'View profile and more'};
const yourRepositories={role:'menuitem',name:'Your repositories'};
const type={role:'combobox',name:'Type'};
const repositoryName="a[itemprop='name codeRepository']";
const publicType={role:'menuitemradio',name:'Public'};
//Generate  and add token here with scope of public repositoires.
//const token='';

class RepositoriesPage extends BasePage{
    async verifyRepositoryList()
    {
        let repositoryList=[]; 
        let repositories=[];
        let repositoryUIList=[];
        const reponame=await fetch('https://api.github.com/users/saranyababu2005/repos')
       .then((res)=>res.json())
       .then((data)=>data);
 
       reponame.forEach(element => {
           repositoryList.push(element.name);
       });

       console.log("api repo",repositoryList);

       await (await find(profileMenu)).click();  
       await (await find(yourRepositories)).click();
       await (await find(type)).click();
       await (await find(publicType)).click();
       await (page.waitForTimeout(10000));
       console.log(await (await page.$$eval(repositoryName,(ele)=>ele.length)));
       repositories=await page.$$(repositoryName);
       console.log(repositories.length);
       for (let index = 0; index < repositories.length; index++) {
           const element = repositories[index];
           repositoryUIList.push(await page.evaluate(element=>element.innerText,element));                      
       }
    await expect(repositoryList.sort().toString()).toStrictEqual(repositoryUIList.sort().toString());

    repositoryList.splice(0,repositoryList.length);
    repositoryUIList.splice(0,repositoryUIList); 
    repositories.splice(0,repositories.length);  
    } 
    async createNewRepository(repositoryName){
        const body={
            name:repositoryName
        };
 
        await fetch('https://api.github.com/user/repos',{
            method:'post',
            body:JSON.stringify(body),
            headers:{
                'Content-Type':'application/json',
                 Authorization:`token ${token}`
            }
        })
        .then(response=>console.log(response.status));
        // .then(json=>console.log(json));      
    }
    async updateRepository(repositoryName)
    {
        const body={    
            name:'testing'+await super.randomNumberGeneration()            
        };
        console.log(repositoryName);
        await fetch(`https://api.github.com/repos/saranyababu2005/${repositoryName}`,{
            method:'patch',
            body:JSON.stringify(body),
            headers:{
                'Content-Type':'application/json',
                 Authorization:`token ${token}`
            }
        })
        // .then(response=>console.log(response.status))
        .then(response=>{
            console.log(response.body.text);
            console.log(response.status);
        });      
         return body.name;
    }
    async verifyParticularRepositoryExist(repositoryExistingName,repositoryNewName){
        let repositoryUIList=[];
        let repositories=[];

        await (await find(profileMenu)).click();  
        await (await find(yourRepositories)).click();
        await (await find(type)).click();
        await (await find(publicType)).click();
        await (page.waitForTimeout(5000));
        console.log(await (await page.$$eval(repositoryName,(ele)=>ele.length)));
        repositories=await page.$$(repositoryName);
        console.log(repositories.length);
        for (let index = 0; index < repositories.length; index++) {
            const element = repositories[index];
            repositoryUIList.push(await page.evaluate(element=>element.innerText,element));                      
        }

        await expect(repositoryUIList.includes(repositoryNewName)).toBeTruthy;
        await expect(repositoryUIList.includes(repositoryExistingName)).toBeFalsy;
    }
}

module.exports=RepositoriesPage;