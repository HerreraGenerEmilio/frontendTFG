import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  constructor() { }

  feedItems: any[] =[
    {
      "name": "ejemplo1",
      "url": "../../../assets/imgs/landing/hi52.jpg"
    },
    {
      "name": "ejemplo2",
      "url": "../../../assets/imgs/landing/hi52.jpg"
    },
    {
      "name": "ejemplo3",
      "url": "../../../assets/imgs/landing/hi52.jpg"
    },
    {
      "name": "ejemplo4",
      "url": "../../../assets/imgs/landing/hi52.jpg"
    },
    {
      "name": "ejemplo5",
      "url": "../../../assets/imgs/landing/hi52.jpg"
    },
    {
      "name": "ejemplo6",
      "url": "../../../assets/imgs/landing/hi52.jpg"
    },
    {
      "name": "ejemplo7",
      "url": "../../../assets/imgs/landing/hi52.jpg"
    },
    {
      "name": "ejemplo8",
      "url": "../../../assets/imgs/landing/hi52.jpg"
    },
    {
      "name": "ejemplo9",
      "url": "../../../assets/imgs/landing/hi52.jpg"
    },
    {
      "name": "ejemplo10",
      "url": "../../../assets/imgs/landing/hi52.jpg"
    },
    {
      "name": "ejemplo11",
      "url": "../../../assets/imgs/landing/hi52.jpg"
    },
    {
      "name": "ejemplo12",
      "url": "../../../assets/imgs/landing/hi52.jpg"
    },
    {
      "name": "ejemplo13",
      "url": "../../../assets/imgs/landing/hi52.jpg"
    },
    {
      "name": "ejemplo14",
      "url": "../../../assets/imgs/landing/hi52.jpg"
    },
    {
      "name": "ejemplo15",
      "url": "../../../assets/imgs/landing/hi52.jpg"
    },
    {
      "name": "ejemplo16",
      "url": "../../../assets/imgs/landing/hi52.jpg"
    },
    {
      "name": "ejemplo17",
      "url": "../../../assets/imgs/landing/hi52.jpg"
    },
    {
      "name": "ejemplo18",
      "url": "../../../assets/imgs/landing/hi52.jpg"
    },
    {
      "name": "ejemplo19",
      "url": "../../../assets/imgs/landing/hi52.jpg"
    },
    {
      "name": "ejemplo20",
      "url": "../../../assets/imgs/landing/hi52.jpg"
    }
  ]
  
  ngOnInit() { }

}
