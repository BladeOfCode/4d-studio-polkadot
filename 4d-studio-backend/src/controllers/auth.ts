import { Request, Response } from "express";
import { isValidSignature } from "../utils/isValidSignature";
import jwt from "jsonwebtoken";
import { keys } from "../config/keys";

// Define user interface
interface User {
  address: string;
}

// Extend Request interface to include user property
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

const signin = async (req: Request, res: Response) => {
  const { address, message, signature } = req.body;

  try {
    //verify if siginin request is valid or not using Polkadot
    const isValid = isValidSignature(message, signature, address);

    if (isValid) {
      //Generate JWT token
      const payload = {
        address: address,
      };
      const token = jwt.sign(payload, keys.jwt.secret ?? "", {
        expiresIn: keys.jwt.tokenLife,
      });

      //Set token in response header
      res.set("Authorization", `Bearer ${token}`);

      //Set user address in session
      (req.user = { address: address }), console.log("send data");
      res.status(200).json({
        data: {
          success: true,
          token: `Bearer ${token}`,
        },
      });
      console.log("end");
    } else {
      return res.status(401).send("Invalid Signin Request");
    }
  } catch (error: any) {
    return res.status(500).send("Internal Server Error!");
  }
};

const me = async (req: Request, res: Response) => {
  res.status(200).json({
    data: {
      success: true,
      user: req.user,
    },
  });
};

export { signin, me };
