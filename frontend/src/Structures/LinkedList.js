// Nodo de usuario
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

// Lista enlazada de usuarios
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

  // Buscar un usuario por ID (DNI)
  findUserById(id) {
    let current = this.head;
    while (current) {
      if (current.id === id) return current;
      current = current.next;
    }
    return null; // Retorna null si no se encuentra el usuario
  }

   // Eliminar un usuario por ID (DNI)
  removeUserById(id) {
    if (!this.head) return null;

    // Si el usuario a eliminar es la cabeza
    if (this.head.id === id) {
      this.head = this.head.next;
      this.size--;
      return true;
    }

    let current = this.head;
    let prev = null;

    while (current) {
      if (current.id === id) {
        prev.next = current.next;
        this.size--;
        return true;
      }
      prev = current;
      current = current.next;
    }

    return false; // Retorna false si no se encuentra el usuario
  }

  // Obtener todos los usuarios
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