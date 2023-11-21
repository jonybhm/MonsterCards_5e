const tiposDeMonstruos = ['Aberración', 'Bestia', 'Celestial', 'Dragón', 'Elemental', 'Fey', 'Fiend', 'Gigante', 'Humanoide', 'Monstruosidad', 'Ooze', 'Planta', 'No Muerto'];

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

