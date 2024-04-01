// ##~importsStart

import { vDev } from './vDev/vDev/vDev.jsx';
import { Home } from './home/home.jsx';
import { AdminSettings } from './admin/adminSettings.jsx';

// ##~importsEnd
// ================================================================

let allMainEles={}

allMainEles={ 
    // ##~menuComonentsStart
    Home, 
    vDev, 
    AdminSettings,    
    // ##~menuComonentsEnd
}


// ##~mainExport
export const allMainElesC=allMainEles;