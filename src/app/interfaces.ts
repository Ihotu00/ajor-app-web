export interface AuthenticatedResponse{
  token: string;
}

export class User {
  id = null;
  firstName = "";
  lastName = "";
  phoneNumber = "";
  email = "";
  doB =  new Date();
  address = ""
}

export class CreateUser {
  user = new User
  username = ""
  password = ""
}

export class CreateOrg {
  name = ""
  contactNumber = ""
  email = ""
  address = ""
  username = ""
  password = ""
  type = ""
}