import { useState, useEffect, FormEventHandler } from 'react';
import DashboardHeader from '../../../components/DashboardHeader';
import styles from './styles.module.scss';
import { Pagination } from 'react-bootstrap';
import { useDebouncedCallback } from 'use-debounce';
import axios from "../../../services/CustomAxios";
import { AdminLayout } from '../../../layouts';
import OrderModel from '../../../models/Order';
import DataResponse from '../../../models/DataResponse';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface OrderResponse extends DataResponse {
  orders: OrderModel[];
}

function Order () {
    const [ data, setData ] = useState<OrderResponse>({ page: 1, totalPages: 0, orders: [] });
    const [page, setPage] = useState(1);
    const [ updateDataStatus, setUpdateDataStatus ] = useState<number>();
    const [ selectedOrder, setSelectedOrder ] = useState<number>(-1);
    
    useEffect(() => {
      const fetchOrders = async () => {
        try {
          const response = await axios.get(`/order/all?page=${page}&limit=20`);          
          setData(response.data.data);
        }
        catch (e) {
          toast.error((e as AxiosError).message);
        }
      }

      if(page === 0) {
        setPage(1);
      }
      else {
        fetchOrders();
      }
    }, [updateDataStatus, page]);

    const __handleSearch : FormEventHandler = useDebouncedCallback((e) => {
      handleSearch(e.target.value);
    }, 300);

    const handleSearch = (search : string) => {
      if (search !== "") {
          let search_results : OrderModel[] = data.orders.filter((item) =>
              item.id == parseInt(search.trim()) ||
              item.user.name.includes(search.toLowerCase())
          );            
          setData((prevState) => ({...prevState, orders: search_results}));
      }
      else {            
          handleChangePage(0);
      }
    }

    // Change Page 
    const handleChangePage = (newPage : number) => {
      setPage(newPage);
    }

    const handleConfirmOrder = async (orderId : number) => {
      if(orderId > 0) {
        try {
          await toast.promise(
            axios.post("/order/confirm", { orderId }),
            {
              success: "Đơn hàng được duyệt thành công",
              pending: "Đang xử lý"
            })
            setUpdateDataStatus(Math.random() * Math.random());
        }
        catch(e) {
          toast.error(((e as AxiosError).response?.data as { message: string, data: any }).message);
        }
      }
      else {
        toast.error("Vui lòng chọn đơn hàng!");
      }
    }
    
    const handleRejectOrder = async (orderId : number) => {
      if(orderId > 0) {
        try {
          await toast.promise(
            axios.post("/order/reject", { orderId }),
            {
              success: "Đơn hàng được duyệt thành công",
              pending: "Đang xử lý"
            })
            setUpdateDataStatus(Math.random() * Math.random());
        }
        catch(e) {
          toast.error(((e as AxiosError).response?.data as { message: string, data: any }).message);
        }
      }
      else {
        toast.error("Vui lòng chọn đơn hàng!");
      }
    }

    return(
        <AdminLayout>
            <div className="modal fade" id="confirmOrder">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Xác nhận duyệt đơn hàng?</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            Bạn có chắc chắn muốn duyệt đơn hàng không?
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Hủy</button>
                            <button type="button" className="btn btn-dark" data-bs-dismiss="modal" onClick={() => handleConfirmOrder( selectedOrder + 1 )}>Xác nhận</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="rejectOrder">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Xác nhận hủy đơn hàng?</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            Bạn có chắc chắn muốn hủy đơn hàng không?
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Hủy</button>
                            <button type="button" className="btn btn-dark" data-bs-dismiss="modal" onClick={() => handleRejectOrder( selectedOrder + 1 )}>Xác nhận</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="dashboard-body">
                <div className='dashboard-content pe-2'>
                    <DashboardHeader/>
                    <div className="row px-3">
                        <div className="col-9">
                            <div className='dashboard-content-container'>
                                <div className='dashboard-content-header'>
                                    <h2>Danh sách Hóa đơn</h2>
                                    <div className="d-flex dashboard-filter">
                                        <div className='dashboard-content-search'>
                                            <input
                                                type='text'
                                                placeholder='Search..'
                                                className='dashboard-content-input'
                                                onChange={__handleSearch} />
                                        </div>
                                    </div>
                                </div>

                                <table>
                                    <thead>
                                        <th></th>
                                        <th>ID</th>
                                        <th>KHÁCH HÀNG</th>
                                        <th>THỜI GIAN</th>
                                        <th>TRẠNG THÁI</th>
                                        <th>GIÁ</th>
                                    </thead>

                                    {
                                    data.totalPages !== 0 ?
                                        <tbody>
                                            {
                                                data?.orders?.map((order, index) => {
                                                  console.log(order);
                                                  
                                                    return(
                                                        <tr key={ order.id } className="data-row" onClick={() => setSelectedOrder(index)}>
                                                          <td><input type="radio" name="selected" value={ index } checked={selectedOrder === index}/></td>
                                                          <td><span>#{order.id}</span></td>
                                                          <td><span>{order.user.name}</span></td>
                                                          <td><span>{(order.time + "").replace("T", " - ").split("+")[0]}</span></td>
                                                          <td><span className={ cx("status", order.status.toLowerCase()) }>{ order.status}</span></td>
                                                          <td><span>{ order.price.toLocaleString("en") }đ</span></td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    : null
                                    }
                                </table>

                                {data.totalPages !== 0 ?
                                    <div className='dashboard-content-footer'>
                                        <Pagination>
                                            <Pagination.First onClick={() => handleChangePage(1)}/>
                                            <Pagination.Prev onClick={() => page > 1 ? handleChangePage(page - 1) : undefined}/>
                                            {
                                                new Array(data.totalPages).fill(null).map((_value, index) => {
                                                    const i = index + 1;
                                                    return <Pagination.Item key={index} active={page === i} onClick={() => handleChangePage(index + 1)}>{i}</Pagination.Item>
                                                })
                                            }
                                            <Pagination.Next onClick={() => page < data.totalPages ? handleChangePage(page + 1) : undefined}/>
                                            <Pagination.Last onClick={() => handleChangePage(data.totalPages)}/>
                                        </Pagination>
                                    </div>
                                : 
                                    <div className='dashboard-content-footer'>
                                        <span className='empty-table'>No data</span>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className={ cx("order-products") + " col-3 d-flex flex-column justify-content-between" }>
                          <h3>Sản phẩm</h3>
                          {
                            data.orders[selectedOrder]?.products.map((product) => {
                                return  <div key={product.id + product.name} className={cx("slip-cart-product")}>
                                            <div className="cart-product-img">
                                                <img src={ product.images[0].src } alt="" />
                                            </div>
                                            <div className={cx("info")}>
                                                <h3><a href="">{product.name}</a></h3>
                                                <div className={cx("properties")}>
                                                    <p>Màu sắc: { product.colors[0].name}</p>
                                                    <p>Size: { product.sizes[0].name }</p>
                                                </div>
                                                <div className={cx("price-group")}>
                                                    <div className={cx("quantity-group")}>
                                                        Số lượng: 1
                                                    </div>
                                                    <h3 className={cx("price")}>{ product.salePrice.toLocaleString("en") }đ</h3>
                                                </div>
                                            </div>
                                        </div>
                            })
                          }
                          <div className='mt-3 d-flex justify-content-between align-items-center'>
                            <h6>Tổng tiền: { data.orders[selectedOrder]?.products.reduce((sum, item) => sum + item.salePrice, 0).toLocaleString("en") }đ</h6>
                              {
                                selectedOrder != -1 && data.orders[selectedOrder].status !== "COMPLETED" && data.orders[selectedOrder].status !== "REJECTED" &&
                                <div className='d-flex'>
                                    <button className='btn btn-secondary me-2' data-bs-toggle="modal" data-bs-target="#rejectOrder">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill='#fff'>
                                        <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
                                      </svg>
                                    </button>
                                    <button className='btn btn-dark' data-bs-toggle="modal" data-bs-target="#confirmOrder">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill='#fff'>
                                        <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path>
                                      </svg>
                                    </button>
                                </div>
                              }
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default Order;