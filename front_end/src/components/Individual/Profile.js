import React, { useEffect , useState, useHistory} from "react";
import profile from "../../assets/salon_profile.jpg";

const Profile = () => {
  
  /*  const [userData, setUserData] = useState({});
  const callIndividualPage = async ()=>{
    try{
      const res = await fetch('/individual', {
        method : "GET",
        headers:{
             Accept: "application/json",
             "Content-Type": "application/json"
        },
        credentials: "include"
       });

       const data = await res.json();
       console.log(data);
       setUserData(data);

       if(res.status !== 200){
         const err = new Error(res.error);
         throw err;
       }
    }
    catch(err){
      console.log(err);
      history.push("/login");

    }
  }
  useEffect(()=>{
    callIndividualPage();
  },[])
  */
  return (
    <>
      <div className="profile-outer">
        <div className="profile-parent">
          <div className="profile-main">
            <div className="profile-img img-width">
              <img src={profile} alt="Profile" />
            </div>
            <div className="profile-content cont-width ">
              <p>Welcome </p>
              <div className="title">{/*userData.username*/}</div>
              <div className="text">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vivamus nibh dolor, gravida faucibus dolor consectetur,
                  pulvinar rhoncus risus. Fusce vel rutrum mi. Suspendisse
                  pretium tellus eu ipsum pellentesque convallis. Ut mollis
                  libero eu massa imperdiet faucibus vitae non diam. Sed egestas
                  felis libero, ut suscipit nisl varius non. Proin eget suscipit
                  nulla. Nulla facilisi. In hac habitasse platea dictumst.
                </p>
              </div>
              <div className="p-btn">
                <button>View More</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
