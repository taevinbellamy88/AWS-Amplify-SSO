import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APIService, Restaurant } from '../API.service';
import { ZenObservable } from 'zen-observable-ts';
import { Location } from '@angular/common';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css'],
})
export class RestaurantsComponent implements OnInit, OnDestroy {
  /* declare sub variable */
  private subscription: ZenObservable.Subscription | null = null;
  /* declare form variable */
  public createForm: FormGroup;
  /* declare restaurants variable */
  public restaurants: Array<Restaurant> = [];
  editForm: any;

  constructor(
    private api: APIService,
    private fb: FormBuilder,
    private location: Location
  ) {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      city: ['', Validators.required],
    });
    this.editForm = this.fb.group({
      name: '',
      description: '',
      city: '',
    });
  }

  goBack() {
    this.location.back();
  }

  async ngOnInit() {
    this.api.ListRestaurants().then((event) => {
      this.restaurants = event.items as Restaurant[];
    });

    /* subscribe to new restaurants being created */
    this.subscription = this.api
      .OnCreateRestaurantListener()
      .subscribe((event: any) => {
        const newRestaurant = event.value.data.onCreateRestaurant;
        this.restaurants = [newRestaurant, ...this.restaurants];
      });
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = null;
  }

  public onCreate(restaurant: Restaurant) {
    this.api
      .CreateRestaurant(restaurant)
      .then((event) => {
        console.log('item created!');
        this.createForm.reset();
      })
      .catch((e) => {
        console.log('error creating restaurant...', e);
      });
  }

  public onDelete(restaurant: Restaurant) {
    this.api
      .DeleteRestaurant({ id: restaurant.id }) // pass the restaurant ID as a DeleteRestaurantInput object
      .then((event) => {
        console.log('Item Deleted!');
        // Remove the deleted restaurant from the restaurants array
        this.restaurants = this.restaurants.filter(
          (r) => r.id !== restaurant.id
        );
      })
      .catch((e) => {
        console.log('error deleting restaurant...', e);
      });
  }
  public onEdit(restaurant: Restaurant) {
    restaurant.editing = true;
    this.editForm.patchValue(restaurant);
  }
  onUpdateSubmit(restaurant: Restaurant) {
    const updateData = {
      id: restaurant.id,
      ...this.editForm.value,
    };
    this.api
      .UpdateRestaurant(updateData)
      .then(() => {
        console.log('Restaurant updated successfully');
        restaurant.editing = false;
      })
      .catch((error) => {
        console.error('Error updating restaurant', error);
      });
  }
  onUpdateCancel(restaurant: Restaurant) {
    this.editForm.reset();
    restaurant.editing = false;
  }
}
