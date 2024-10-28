import mongoose, { Document, Schema, Model } from "mongoose";

export enum Category {
  Property = "Property",
  Cars = "Cars",
  Bikes = "Bikes",
  Gadgets = "Gadgets",
  Fashion = "Fashion",
  Sports = "Sports",
  Books = "Books",
  EventDecor = "Event Decor",
  Travel = "Travel",
  Pets = "Pets",
}

export const Subcategories: { [key in Category]?: string[] } = {
  [Category.Bikes]: [
    "Road Bike",
    "Mountain Bike",
    "Hybrid Bike",
    "Electric Bike",
  ],
  [Category.Gadgets]: [
    "Computers & Laptops",
    "Mobile Devices",
    "Audio & Video",
    "Cameras & Photography",
    "Household Appliances",
    "Smart Home Devices",
  ],
  [Category.Fashion]: [
    "Clothing",
    "Footwear",
    "Accessories (includes Makeup)",
    "Style Categories",
  ],
  [Category.Sports]: ["Team Sports", "Racquet Sports", "Fitness Equipment"],
  [Category.Books]: ["Fiction", "Non-Fiction", "Children’s Books", "Other"],
  [Category.Travel]: ["Camping Equipment", "Luggage", "Electronics for Travel"],
  [Category.EventDecor]: ["Home Décor", "Outdoor Décor", "Seasonal Décor"],
  [Category.Pets]: ["Dogs", "Cats", "Birds", "Fish", "Rabbits"],
};

interface UploadProducts extends Document {
  category: Category;
  subcategory: string;
  details: { [key: string]: any };
}

const uploadProductModel: Schema<UploadProducts> = new Schema(
  {
    category: {
      type: String,
      enum: Object.values(Category),
      required: true,
    },
    subcategory: {
      type: String,
      required: true,
      validate: {
        validator: function (value: string) {
          const category = (this as UploadProducts).category;
          return Subcategories[category]?.includes(value) ?? false;
        },
        message: (props) =>
          `${props.value} is not a valid subcategory for the selected category.`,
      },
    },
    details: {
      type: Schema.Types.Mixed,
      default: null,
      required: true,
    },
  },
  { timestamps: true }
);

const UploadProduct: Model<UploadProducts> =
  mongoose.models.UploadProducts ||
  mongoose.model<UploadProducts>("UploadProducts", uploadProductModel);

export default UploadProduct;
