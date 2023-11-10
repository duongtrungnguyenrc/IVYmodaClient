import ShippingIcon from '../assets/icons/shipping.svg';
import ProductIcon from '../assets/icons/product.svg';

const sidebar_menu = [
    // {
    //     id: 1,
    //     icon: DashboardIcon,
    //     path: '/',
    //     title: 'Dashboard',
    // },
    {
        id: 1,
        icon: ProductIcon,
        path: '/admin/',
        title: 'Orders',
    },
    {
        id: 2,
        icon: ShippingIcon,
        path: '/admin/products',
        title: 'Products',
    },
    // {
    //     id: 3,
    //     icon: UserIcon,
    //     path: '/admin/profile',
    //     title: 'My account',
    // }
]

export default sidebar_menu;