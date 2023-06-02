const Desktop3 = () => {
  return (
    <div className="changepassflex">
      <div className="changepasswidth">
        <div className="changepassjustify">
            <form action="">
            <div className="changeinput">
            <input className="chpsin"
                  type="email"
                  // value={formData.email}
                  // onChange={handleChange}
                  placeholder="Email Address"
                  name="email"
                  required
                /> 
                </div>
                <div className="changeinput">
                <input className="chpsin"
                  type="password"
                  // value={formData.email}
                  // onChange={handleChange}
                  placeholder="New Password"
                  name="newpass"
                  required
                />
                </div>
                <div className="changeinput">
                <input className="chpsin"
                  type="password"
                  // value={formData.email}
                  // onChange={handleChange}
                  placeholder="Confirm Password"
                  name="confpass"
                  required
                />
                </div>
                <div className="changebtn changeinput">
                <button type="submit">Change Password</button>
                 </div>            
            </form>
        </div>
      </div>
    </div>
  );
};

export default Desktop3;
