import profile from "../../assets/salon_profile.jpg";
import Cookies from "universal-cookie";


const Profile = () => {

        const cookies = new Cookies();
        const userName = cookies.get('user');
          
  
  
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
              <div className="title">{userName}</div>
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
