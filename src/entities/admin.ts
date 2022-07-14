import unreal from "../unreal";

const newAdmin = async () => {
  const firstName = unreal.user.firstName();
  const lastName = unreal.user.lastName();

  const admin = {
    username: unreal.user.userName(firstName, lastName),
    email: unreal.user.email(),
    password: await unreal.user.hashedPassword(),
    firstname: firstName,
    lastname: lastName,
    phonenumber: unreal.user.phoneNumber(),
    nationalcode: unreal.user.nationalCode(1111111111, 9999999999),
    created_at: unreal.date.randomSQLPastDate(3650, 366),
    last_login: unreal.date.recentDate().toISOString(),
  };

  return admin;
};
