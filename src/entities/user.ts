import { DatabaseConnection } from "../db";
import unreal from "../unreal";
import { randomSQLPastDate } from "../unreal/lib/date";
import { trueOrFalse } from "../unreal/lib/utils/helpers";

const {
  birthday,
  email,
  firstName,
  hashedPassword,
  lastName,
  nationalCode,
  phoneNumber,
  userName,
} = unreal.user;

export interface IUser {
  username: string;
  email: any;
  password: any;
  firstname: string;
  lastname: string;
  dateofbirth: any;
  phonenumber: any;
  phone_isverified: any;
  email_isverified: any;
  card_isverified: any;
  created_at: any;
  last_login: any;
}

export interface IUserRow extends IUser {
  id: string;
}

async function newUser() {
  const userFirstName = firstName();
  const userLastName = lastName();

  const newUser = {
    username: userName(userFirstName, userLastName),
    email: email(),
    password: await hashedPassword(),
    profile_picture: unreal.image.randomAbstractImage(),
    firstname: userFirstName,
    lastname: userLastName,
    dateofbirth: birthday(),
    phonenumber: phoneNumber(),
    phone_isverified: trueOrFalse(),
    email_isverified: trueOrFalse(),
    card_isverified: trueOrFalse(),
    created_at: randomSQLPastDate(3655, 1),
    last_login: randomSQLPastDate(3010, 1),
  };

  return newUser;
}

export const getAllUsers = async (
  db: DatabaseConnection
): Promise<IUserRow[]> => {
  const { rows } = await db.query("SELECT * FROM users");

  return rows;
};

export default newUser;
