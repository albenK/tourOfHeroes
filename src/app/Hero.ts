/*
  NOTES: The purpose of this class is just to define what a Hero is..
*/

export class Hero
{
  public $key:string; //refers to key of Hero Object in database..
  public name:string;
  constructor(aName:string)
  {
    this.name = aName;
    this.$key = "";
  }
}
