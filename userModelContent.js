export const generateUserModelContent = () => {
  return `export default class User {
    constructor (id, forename, lastname, email, password, role) {
      this._id = id
      this._forename = forename
      this._lastname = lastname
      this._email = email
      this._password = password
      this._role = role
    }
    get id () {
      return this._id
    }

    set id (value) {
      this._id = value
    }

    get forename () {
      return this._forename
    }

    set forename (value) {
      this._forename = value
    }

    get lastname () {
      return this._lastname
    }

    set lastname (value) {
      this._lastname = value
    }

    get email () {
      return this._email
    }

    set email (value) {
      this._email = value
    }

    get password () {
      return this._password
    }

    set password (value) {
      this._password = value
    }

    get role () {
      return this._role
    }

    set role (value) {
      this._role = value
    }

  }`
}