import { inquireMenu, pausa } from "./helpers/inquirer.js";


const main = async() => {
    
   let opt;
   do{
    opt = await inquireMenu();
    
    console.log({opt});

    if (opt !== 0) await pausa(); 
    
   }
   while(opt !== 0);
}
 
main();