
class UserNode {
  constructor(id, email, password, lastName, firstName, gender, birthDate) {
    this.id = id; // DNI del usuario
    this.email = email;
    this.password = password;
    this.lastName = lastName;
    this.firstName = firstName;
    this.gender = gender;
    this.birthDate = birthDate;
    this.next = null; // Puntero al siguiente nodo
  }
}

class UserLinkedList {
  constructor() {
    this.head = null; // Cabeza de la lista
    this.size = 0; // Tamaño de la lista
  }

  // Agregar un usuario a la lista
  addUser(id, email, password, lastName, firstName, gender, birthDate) {
    const newUser = new UserNode(id, email, password, lastName, firstName, gender, birthDate);

    if (!this.head) {
      this.head = newUser; // Si la lista está vacía, el nuevo usuario será la cabeza
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next; // Avanzar hasta el último nodo
      }
      current.next = newUser; // Agregar el nuevo nodo al final
    }
    this.size++;
  }

  // Verificar credenciales de inicio de sesión
  verifyLogin(email, password) {
    let current = this.head;
    while (current) {
      if (current.email === email && current.password === password) {
        return current; // Retorna el usuario si las credenciales coinciden
      }
      current = current.next;
    }
    return null; // Retorna null si no se encuentran las credenciales
  }

  // Obtener todos los usuarios (para debugging)
  getAllUsers() {
    const users = [];
    let current = this.head;
    while (current) {
      users.push({
        id: current.id,
        email: current.email,
        lastName: current.lastName,
        firstName: current.firstName,
        gender: current.gender,
        birthDate: current.birthDate,
      });
      current = current.next;
    }
    return users;
  }
}

export default UserLinkedList;
