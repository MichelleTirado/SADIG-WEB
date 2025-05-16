import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import $ from "jquery";
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  decode: any = {};
  today: Date = new Date();
  _today: Date = new Date(2024,11,1);
  user: string = '';
  // userRole = localStorage.getItem('role');
  menuItems = [
    {
      label: 'Página A',
      command: () => {
        this.router.navigate(['/hola']);
      }
    },
    {
      label: 'Página B',
      children: [
        {
          label: 'Subpágina B1',
          command: () => {
            this.router.navigate(['/subpagina-b1']);
          }
        }
      ]
    },
    {
      label: 'Subpágina B2',
      command: () => {
        this.router.navigate(['/subpagina-b2']);
      }
    }
  ];

  showProfileDetail: boolean = false;
  showMenu: boolean = false;

  @HostListener('document:click', ['$event'])
  clickOutside(event: any){
    if(!event.target.closest('.header__profile-data')){
      this.showProfileDetail = false;
    } else {
      this.showProfileDetail = true;
    }
  }

  constructor(
    protected sharedService: SharedService,
    private router: Router
  ){}

  ngOnInit(): void {
    
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
    const menu = document.getElementById('mobileMenu');
    
    if(menu) {
      menu.style.left = this.showMenu?'0':'-100vw';
    }
  }

  localStorageC(){
    const confirmed = confirm('¿Estás seguro que quieres salir?');

    // Check if the user confirmed
    if(confirmed) {
      // Perform logout logic here, e.g., clearing tokens or session data
      localStorage.clear(); // Example: clear auth token
      this.router.navigate(['auth/login']); // Redirect to the login page
    }
  }

  menuLinksConfiguration(): void {
    $(".menu-link").click(function () {
      $(".menu-link").removeClass("is-active");
      $(this).addClass("is-active");
     });
  }

  getPicture() {
    const token = localStorage.getItem('authToken') || "";
    this.decode = jwtDecode(token);
    return 'https://firebasestorage.googleapis.com/v0/b/secap-533fc.appspot.com/o/' + this.decode.userPhoto;
  }
  
  logOut() {
    // Swal.fire({
    //   title: '¿Quieres cerrar sesión?',
    //   icon: 'question',
    //   showCancelButton: true,

    //   cancelButtonText: 'No, espera.',
    //   confirmButtonText: 'Sí, quiero salir.'
    // }).then((result) => {
    //   if (result.isConfirmed) {

    //     this.sweet.AlertTime('center', 'success', 'Nos vemos!', false, 2000)
    //   }
    // })
  }
}
