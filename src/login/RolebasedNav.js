
import {navconfig} from "../_nav";



export default function  RolebasedNav()
{ var role=sessionStorage.getItem("role")
  var routingnav
 routingnav=navconfig[role]
 /* if("Orgadmin" === sessionStorage.getItem("role"))
  {
    routingnav=navconfig.sessionStorage.getItem("role");


  }
  else if("Modusadmin"===sessionStorage.getItem("role")){

    routingnav=navconfig.Modusadmin;
  }
*/
  return routingnav





}
