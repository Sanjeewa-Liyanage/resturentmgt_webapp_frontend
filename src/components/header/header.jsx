import UserTag from "../userdata/userdata.jsx";


function Header() {
  return (
    <header className="w-full bg-blue-400 flex h-[100px] relative items-center p-[10px] ">

      <h1 className="text-white text[30px] ">Yakkaduwa villa </h1>
       <UserTag name="Sanjeewa" image ="https://th.bing.com/th/id/OIP.DQdhyRifE5tywz-uIlBKUAHaHa?rs=1&pid=ImgDetMain"/>
       
    </header>
  );
}

export default Header;