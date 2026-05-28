import { Category, Product, Sale, StockMovement } from '../types';

export const mockCategories: Category[] = [
{ id: 'c1', name: 'เครื่องดื่ม' },
{ id: 'c2', name: 'ขนมขบเคี้ยว' },
{ id: 'c3', name: 'ของใช้ส่วนตัว' },
{ id: 'c4', name: 'อาหารกึ่งสำเร็จรูป' },
{ id: 'c5', name: 'เครื่องปรุงรส' }];


export const mockProducts: Product[] = [
{
  id: 'p1',
  sku: 'DRK-001',
  name: 'น้ำดื่มคริสตัล 600มล.',
  categoryId: 'c1',
  price: 7,
  cost: 4.5,
  stock: 150,
  minStock: 50,
  imageUrl:
  'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=300&q=80',
  status: 'active'
},
{
  id: 'p2',
  sku: 'DRK-002',
  name: 'โค้ก กระป๋อง 325มล.',
  categoryId: 'c1',
  price: 15,
  cost: 11,
  stock: 85,
  minStock: 30,
  imageUrl:
  'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=300&q=80',
  status: 'active'
},
{
  id: 'p3',
  sku: 'DRK-003',
  name: 'กาแฟกระป๋อง เบอร์ดี้',
  categoryId: 'c1',
  price: 17,
  cost: 13,
  stock: 40,
  minStock: 20,
  imageUrl:
  'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=300&q=80',
  status: 'active'
},
{
  id: 'p4',
  sku: 'DRK-004',
  name: 'นมสดเมจิ 200มล.',
  categoryId: 'c1',
  price: 12.5,
  cost: 9,
  stock: 15,
  minStock: 20,
  imageUrl:
  'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=300&q=80',
  status: 'active'
},
{
  id: 'p5',
  sku: 'SNK-001',
  name: 'เลย์ รสมันฝรั่งแท้ 50ก.',
  categoryId: 'c2',
  price: 20,
  cost: 15,
  stock: 60,
  minStock: 20,
  imageUrl:
  'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=300&q=80',
  status: 'active'
},
{
  id: 'p6',
  sku: 'SNK-002',
  name: 'ทาโร่ รสเข้มข้น',
  categoryId: 'c2',
  price: 20,
  cost: 14,
  stock: 45,
  minStock: 15,
  imageUrl:
  'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=300&q=80',
  status: 'active'
},
{
  id: 'p7',
  sku: 'SNK-003',
  name: 'ป๊อกกี้ รสช็อกโกแลต',
  categoryId: 'c2',
  price: 20,
  cost: 15,
  stock: 30,
  minStock: 15,
  imageUrl:
  'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=300&q=80',
  status: 'active'
},
{
  id: 'p8',
  sku: 'PRS-001',
  name: 'สบู่ก้อน นกแก้ว',
  categoryId: 'c3',
  price: 15,
  cost: 10,
  stock: 120,
  minStock: 30,
  imageUrl:
  'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=300&q=80',
  status: 'active'
},
{
  id: 'p9',
  sku: 'PRS-002',
  name: 'ยาสีฟัน คอลเกต 150ก.',
  categoryId: 'c3',
  price: 55,
  cost: 40,
  stock: 25,
  minStock: 15,
  imageUrl:
  'https://images.unsplash.com/photo-1559598467-f8b76c8155d0?auto=format&fit=crop&w=300&q=80',
  status: 'active'
},
{
  id: 'p10',
  sku: 'PRS-003',
  name: 'แชมพู ซันซิล 320มล.',
  categoryId: 'c3',
  price: 129,
  cost: 95,
  stock: 18,
  minStock: 10,
  imageUrl:
  'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=300&q=80',
  status: 'active'
},
{
  id: 'p11',
  sku: 'PRS-004',
  name: 'ผงซักฟอก บรีส 1000ก.',
  categoryId: 'c3',
  price: 99,
  cost: 75,
  stock: 8,
  minStock: 10,
  imageUrl:
  'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=300&q=80',
  status: 'active'
},
{
  id: 'p12',
  sku: 'NOD-001',
  name: 'มาม่า หมูสับ',
  categoryId: 'c4',
  price: 6,
  cost: 4.5,
  stock: 200,
  minStock: 50,
  imageUrl:
  'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&w=300&q=80',
  status: 'active'
},
{
  id: 'p13',
  sku: 'NOD-002',
  name: 'ไวไว ปรุงสำเร็จ',
  categoryId: 'c4',
  price: 6,
  cost: 4.5,
  stock: 180,
  minStock: 50,
  imageUrl:
  'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=300&q=80',
  status: 'active'
},
{
  id: 'p14',
  sku: 'NOD-003',
  name: 'ยำยำ จัมโบ้ ต้มยำกุ้ง',
  categoryId: 'c4',
  price: 6,
  cost: 4.5,
  stock: 150,
  minStock: 50,
  imageUrl:
  'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=300&q=80',
  status: 'active'
},
{
  id: 'p15',
  sku: 'CND-001',
  name: 'น้ำปลา ทิพรส 700มล.',
  categoryId: 'c5',
  price: 32,
  cost: 25,
  stock: 40,
  minStock: 15,
  imageUrl:
  'https://images.unsplash.com/photo-1596647414923-28f096230491?auto=format&fit=crop&w=300&q=80',
  status: 'active'
},
{
  id: 'p16',
  sku: 'CND-002',
  name: 'ซีอิ๊วขาว เด็กสมบูรณ์',
  categoryId: 'c5',
  price: 28,
  cost: 22,
  stock: 35,
  minStock: 15,
  imageUrl:
  'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=300&q=80',
  status: 'active'
},
{
  id: 'p17',
  sku: 'CND-003',
  name: 'น้ำมันปาล์ม มรกต 1ล.',
  categoryId: 'c5',
  price: 48,
  cost: 40,
  stock: 60,
  minStock: 20,
  imageUrl:
  'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=300&q=80',
  status: 'active'
},
{
  id: 'p18',
  sku: 'CND-004',
  name: 'น้ำตาลทราย มิตรผล 1กก.',
  categoryId: 'c5',
  price: 25,
  cost: 21,
  stock: 80,
  minStock: 30,
  imageUrl:
  'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&w=300&q=80',
  status: 'active'
},
{
  id: 'p19',
  sku: 'DRK-005',
  name: 'น้ำแร่ ออร่า 500มล.',
  categoryId: 'c1',
  price: 12,
  cost: 8,
  stock: 90,
  minStock: 30,
  imageUrl:
  'https://images.unsplash.com/photo-1546872004-9c44569c7924?auto=format&fit=crop&w=300&q=80',
  status: 'active'
},
{
  id: 'p20',
  sku: 'SNK-004',
  name: 'เถ้าแก่น้อย รสคลาสสิค',
  categoryId: 'c2',
  price: 39,
  cost: 30,
  stock: 25,
  minStock: 10,
  imageUrl:
  'https://images.unsplash.com/photo-1599598425947-3300262b3394?auto=format&fit=crop&w=300&q=80',
  status: 'active'
}];


const generateMockSales = (): Sale[] => {
  const sales: Sale[] = [];
  const now = new Date();

  for (let i = 1; i <= 30; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() - Math.floor(Math.random() * 7)); // Last 7 days
    date.setHours(
      8 + Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 60)
    );

    const numItems = 1 + Math.floor(Math.random() * 4);
    const items = [];
    let subtotal = 0;

    for (let j = 0; j < numItems; j++) {
      const product =
      mockProducts[Math.floor(Math.random() * mockProducts.length)];
      const quantity = 1 + Math.floor(Math.random() * 3);
      const total = product.price * quantity;

      items.push({
        productId: product.id,
        productName: product.name,
        quantity,
        price: product.price,
        total
      });
      subtotal += total;
    }

    const tax = subtotal * 0.07;
    const total = subtotal + tax;
    const paymentMethods: ('cash' | 'transfer' | 'card')[] = [
    'cash',
    'transfer',
    'card'];

    const paymentMethod =
    paymentMethods[Math.floor(Math.random() * paymentMethods.length)];

    sales.push({
      id: `INV-${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}-${i.toString().padStart(4, '0')}`,
      date: date.toISOString(),
      items,
      subtotal,
      discount: 0,
      tax,
      total,
      paymentMethod,
      ...(paymentMethod === 'cash' ?
      {
        cashReceived: Math.ceil(total / 100) * 100,
        change: Math.ceil(total / 100) * 100 - total
      } :
      {})
    });
  }

  return sales.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

export const mockSales = generateMockSales();

export const mockStockMovements: StockMovement[] = [
{
  id: 'sm1',
  date: new Date(Date.now() - 86400000 * 2).toISOString(),
  productId: 'p1',
  productName: 'น้ำดื่มคริสตัล 600มล.',
  type: 'in',
  quantity: 100,
  cost: 4.5,
  supplier: 'บจก. เสริมสุข',
  user: 'Admin'
},
{
  id: 'sm2',
  date: new Date(Date.now() - 86400000 * 3).toISOString(),
  productId: 'p5',
  productName: 'เลย์ รสมันฝรั่งแท้ 50ก.',
  type: 'in',
  quantity: 50,
  cost: 15,
  supplier: 'บจก. เป๊ปซี่-โคล่า',
  user: 'Admin'
},
{
  id: 'sm3',
  date: new Date(Date.now() - 86400000 * 1).toISOString(),
  productId: 'p11',
  productName: 'ผงซักฟอก บรีส 1000ก.',
  type: 'adjust',
  quantity: -2,
  note: 'สินค้าชำรุด ถุงแตก',
  user: 'Manager'
},
{
  id: 'sm4',
  date: new Date(Date.now() - 86400000 * 5).toISOString(),
  productId: 'p12',
  productName: 'มาม่า หมูสับ',
  type: 'in',
  quantity: 200,
  cost: 4.5,
  supplier: 'บมจ. สหพัฒนพิบูล',
  user: 'Admin'
},
{
  id: 'sm5',
  date: new Date(Date.now() - 86400000 * 4).toISOString(),
  productId: 'p8',
  productName: 'สบู่ก้อน นกแก้ว',
  type: 'in',
  quantity: 120,
  cost: 10,
  supplier: 'บมจ. เบอร์ลี่ ยุคเกอร์',
  user: 'Admin'
}];