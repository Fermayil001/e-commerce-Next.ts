'use client';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { SlBasket } from "react-icons/sl";
import { NoSsr } from '@mui/material';
import { useCart } from '@/stores/cartStore';
import { useRouter } from 'next/navigation';


const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: '0 4px',
  },
}));

const OrderCount = () => {
  const { items } = useCart()
  const router = useRouter()
  return (
    <NoSsr>
      <IconButton aria-label="cart" className='p-0! pr-2! z-0' onClick={() => router.push('/cart')}>
        <StyledBadge badgeContent={items.length} color="success" >
          <SlBasket />
        </StyledBadge>
      </IconButton>
    </NoSsr>

  )
}

export default OrderCount
