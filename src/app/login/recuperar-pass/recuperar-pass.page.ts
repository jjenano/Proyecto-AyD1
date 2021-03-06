import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecuperarserviceService } from './recuperarservice.service';

@Component({
  selector: 'app-recuperar-pass',
  templateUrl: './recuperar-pass.page.html',
  styleUrls: ['./recuperar-pass.page.scss'],
})
export class RecuperarPassPage implements OnInit {
  name:string;
  error_message='';
  constructor(private router: Router,private servicio:RecuperarserviceService ) { }

  ngOnInit() {
    //console.log(this.name)
    this.error_message = ''
  }

  enviarcorreo(correo) {
    if(!this.name){
      this.error_message='No se ingreso correo!';
    }else{
      console.log("LLAMANDO A CORREO")
      this.servicio.recuperarpass(this.name)
      console.log(this.name)
      this.router.navigateByUrl('/login');
    }
  }

  login(){
    this.router.navigateByUrl('/login');
  }

}
