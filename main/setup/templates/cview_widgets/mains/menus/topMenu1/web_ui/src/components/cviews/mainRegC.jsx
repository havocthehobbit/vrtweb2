// ##~importsStart

import { vDev } from './vDev/vDev/vDev.jsx';
import { Home } from './home/home.jsx';
import { AdminSettings } from './admin/adminSettings.jsx';

// ##~importsEnd
// ================================================================

let allMainEles={}

allMainEles={ 
    Home, 
    vDev, 
    AdminSettings,    
}


// ##~mainExport
export const allMainElesC=allMainEles;