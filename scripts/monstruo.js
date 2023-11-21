const tiposDeMonstruos = ['Vampiro', 'Hombre Lobo', 'Fantasma', 'Esqueleto', 'Bruja', 'Zombie'];

localStorage.setItem('tiposDeMonstruos', JSON.stringify(tiposDeMonstruos));

class Personaje
{
    constructor(id, nombre, tipo)
    {
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
    }
}


export class Monstruo extends Personaje
{
    constructor(id, nombre, tipo, alias, alineamiento, xp)
    {
        super(id,nombre,tipo);
        this.alias = alias;
        this.alineamiento = alineamiento;
        this.xp = xp;
    }
}

