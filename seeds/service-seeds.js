const { Service } = require("../models");

const productData = [
  {
    name: "Black & white coffe 1",
    address: "Down town Toronto",
    phone: "487-217-9081",
    description: "Best in downtown",
    type: "cafe",
    postalcode: "M2J1L1",
  },
  {
    name: "Black & white coffer2",
    address: "Down town Toronto",
    phone: "487-217-9081",
    description: "Best in downtown",
    type: "cafe",
    postalcode: "M2J1L2",
  },
  {
    name: "Black & white Barber",
    address: "Down town Toronto",
    phone: "487-217-9081",
    description: "Best in downtown",
    type: "Barber",
    postalcode: "M2J1L3",
  },
  {
    name: "Black & white Restaurant",
    address: "Down town Toronto",
    phone: "487-217-9081",
    description: "Best in downtown",
    type: "Restaurant",
    postalcode: "M2J1L4",
  },
  {
    name: "Black & white Bar",
    address: "Down town Toronto",
    phone: "487-217-9081",
    description: "Best in downtown",
    type: "Bar",
    postalcode: "M2J1L5",
  },
];

const seedServices = () => Service.bulkCreate(productData);

module.exports = seedServices;
