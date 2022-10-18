import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})
export class AsignaturasService {

 /*    //variable:
    asignaturas: any[] = [
      {
        idAsignatura: '1',
        nombre: 'programacion de aplicaciones moviles',
        sigla: 'pgy4121',
        Profesor: 'alan gajardo'
      },{
        idAsignatura: '1',
        nombre: 'ingles',
        sigla: 'ini5111',
        Profesor: 'lala lan'
      }
    ];


    constructor(private router: Router) { }

    //métodos:
    addAsignatura(asignaturas) {
      if (this.getAsignatura(asignaturas.idAsignatura) == undefined) {
        this.asignaturas.push(asignaturas);
        return true;
      }
      return false;
    }
  
    getAsignatura(asignaturas) {
      return this.asignaturas.find(asig => asignaturas.sigla == asignaturas);
    }
  
    gettAsignaturas() {
      return this.asignaturas;
    }
  
    updatetAsignatura(asignaturas) {
      let index = this.asignaturas.findIndex(asig => asig.sigla == asignaturas.sigla);
      this.asignaturas[index] = asignaturas;
    }
  
    deletetAsignatura(asignaturas) {
      this.asignaturas.forEach((asig, index) => {
        if (asig.asignaturas == asignaturas) {
          this.asignaturas.splice(index, 1);
        }
      });
    }} */

     //VARIABLES:
  asignaturas: any[] = [];

  constructor(private asignaturaStorage: Storage) { 
    asignaturaStorage.create();
  }

  //MÉTODOS DEL CRUD DEL STORAGE:
  async agregar(key, Asignatura){
    this.asignaturas = await this.asignaturaStorage.get(key) || [];
    
    //VAMOS A VER SI EL DATO QUE VIENE COMO PARÁMETRO TIENE id:
    //si tiene id, buscamos si existe, si NO tiene id, agregamos:
    if(Asignatura.id == ''){
      var id = this.asignaturas.length + 1;
      Asignatura.id = id;
      this.asignaturas.push(Asignatura);
      await this.asignaturaStorage.set(key, this.asignaturas);
      return true;
    }
    return false;
  }
  
  async getDato(key, identificador){
    this.asignaturas = await this.asignaturaStorage.get(key) || [];
    return this.asignaturas.find(Asignatura => Asignatura.id == identificador);
  }

  async getDatos(key){
    this.asignaturas = await this.asignaturaStorage.get(key) || [];
    return this.asignaturas;
  }

  async eliminar(key, identificador){
    this.asignaturas = await this.asignaturaStorage.get(key) || [];

    this.asignaturas.forEach((value, index) => {
      if(value.id == identificador){
        this.asignaturas.splice(index, 1);
      }
    });

    await this.asignaturaStorage.set(key, this.asignaturas);
  }

  async actualizar(key, dato){
    this.asignaturas = await this.asignaturaStorage.get(key) || [];

    var index = this.asignaturas.findIndex(value => value.id == dato.id);
    this.asignaturas[index] = dato;

    await this.asignaturaStorage.set(key, this.asignaturas);
  }


  
}
