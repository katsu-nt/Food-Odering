import { useGetMyOrders } from "@/api/OrderApi";
import OrderStatusDetail from "@/components/OrderStatusDetail";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton"

const OrderStatusPage = () => {
    const { orders, isLoading } = useGetMyOrders()
    if (isLoading) {
        return <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
    }
    if (!orders || orders.length === 0) {
        return "No orders found"
    }
    return (
        <div className="space-y-10">
            {orders.map((order, index) => (<div key={index} className="space-y-10 bg-gray-50 p-10 rounded-lg"><OrderStatusHeader order={order} />
                <div className="grid gap-10 md:grid-cols-2">
                    <OrderStatusDetail order={order} />
                    <AspectRatio ratio={16 / 5}>
                        <img src={order.restaurant.imageUrl} className="rounded-md object-cover h-full w-full" /></AspectRatio>
                </div>
            </div>))}
        </div>
    )
}

export default OrderStatusPage;