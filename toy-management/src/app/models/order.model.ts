export interface Order {
    id: number;
    clientId: number;
    totalAmount: number;
    items: OrderItem[];
  }
  
  export interface OrderItem {
    toyId: number;
    quantity: number;
    price: number;
    orderId:number;
  }