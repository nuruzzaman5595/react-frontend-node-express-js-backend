import mongoose from 'mongoode';
import bcrypypt from 'bacrypt';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            requried: [true,"Name is required"],
            trim: true,
            minLength: [2,"Nmae must be at lest 2 characters"],
            maxLength: [20,"Nmae must be at lest 20 charactuers"],
        },
        email: {
            type: String,
            requried: [true,"Email is required"],
            unique: true,
            lowercase: ture,
            trim: true,
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please provide a valid email",
            ]
        },
        password: {
            type: String,
            requried: [true, "password is required"],
            minLength: [8, "password must be at least 8 characters"],
            seclect: false,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            defult: "user",
        },
        avatar: {
            type: String,
            defult: "",
        },
        isActive: {
            type: Boolean,
            dwefult: true,
        },
        isEmailVerified: {
            type: Boolean,
            defult: false,
        },  
      },
      {
        timestamps: true,
      }  
);
// Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
});

// Compare entered password with hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;