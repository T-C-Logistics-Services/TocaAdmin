import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { TocaLogo } from '@/assets/toca-logo'
import { type CreateBookingResponse } from '@/stores/apiStore'
import { barcodeQueryOptions, qrCodeQueryOptions } from '../data/queryOptions'

interface FormCompleteProps {
  booking?: CreateBookingResponse['booking']
}

export default function FormComplete({ booking }: FormCompleteProps) {
  const navigate = useNavigate()
  const [barcodeUrl, setBarcodeUrl] = useState<string>('')
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('')

  // Use React Query for barcode
  const { data: barcodeData, isLoading: isBarcodeLoading } = useQuery({
    ...barcodeQueryOptions(booking?.trackingNumber || ''),
    enabled: !!booking?.trackingNumber,
  })

  // Use React Query for QR code
  const { data: qrCodeData, isLoading: isQrCodeLoading } = useQuery({
    ...qrCodeQueryOptions(booking?.trackingNumber || ''),
    enabled: !!booking?.trackingNumber,
  })

  // Convert barcode URL to data URL when data is available
  useEffect(() => {
    if (barcodeData) {
      setBarcodeUrl(URL.createObjectURL(barcodeData))
    }
  }, [barcodeData])

  // Convert QR code URL to data URL when data is available
  useEffect(() => {
    if (qrCodeData) {
      setQrCodeUrl(URL.createObjectURL(qrCodeData))
    }
  }, [qrCodeData])

  if (!booking) {
    return (
      <div className='py-8 text-center'>
        <p className='text-gray-500'>Loading waybill information...</p>
      </div>
    )
  }

  const formatCurrency = (amount: number | string) => {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount
    return `₱${numAmount.toFixed(2)}`
  }

  return (
    <div id='print-area'>
      <div className='text-center'>
        <div className='mb-4 flex justify-center'>
          <h1 className='text-2xl font-semibold'>Waybill</h1>
        </div>

        <div className='text-center'>
          {/* Barcode Section */}

          <div className='my-2 flex justify-center'>
            {/* Placeholder for Barcode Image */}
            <div
              className='flex h-28 w-[300px] items-center justify-center bg-gray-300 text-xs'
              title={`Barcode for ${booking.trackingNumber}`}
            >
              {isBarcodeLoading ? (
                <p>Loading barcode...</p>
              ) : barcodeUrl ? (
                <img
                  src={barcodeUrl}
                  alt='Barcode'
                  className='h-full w-full object-contain'
                />
              ) : (
                <p>Failed to load barcode</p>
              )}
            </div>
          </div>
        </div>

        <div className='mt-6'>
          <table className='w-full'>
            <tbody>
              <tr className=''>
                <td className='py-4 text-left' valign='top'>
                  <p className='font-semibold'>Package</p>
                </td>
                <td className='py-2 text-right text-sm text-gray-600'>
                  <p className='text-base font-semibold text-black'>
                    {booking.package.packageSize}
                  </p>
                  {booking.package.packageIsCustom && (
                    <>
                      <p className=''>
                        {`Weight: ${booking.package.weightKg}kg`}
                      </p>
                      <p className=''>
                        {`Dimension(LxWxH): ${booking.package.length}${booking.package.packageUom}/${booking.package.width}${booking.package.packageUom}/${booking.package.height}${booking.package.packageUom}`}
                      </p>
                    </>
                  )}
                </td>
              </tr>
              <tr className=''>
                <td className='py-4 text-left' valign='top'>
                  <p className='font-semibold'>Receiver</p>
                </td>
                <td className='py-2 text-right text-sm text-gray-600'>
                  <p className='text-base font-semibold text-black'>
                    {booking.recipient.name}
                  </p>
                  <p className=''>
                    {booking.recipient.streetAddress},{' '}
                    {booking.recipient.barangayDistrictName},
                  </p>
                  <p className=''>
                    {booking.recipient.cityMunicipalityName},{' '}
                    {booking.recipient.provinceName}
                  </p>
                  <p className=''>{booking.recipient.mobileNumber}</p>
                </td>
              </tr>
              <tr className=''>
                <td className='py-2 text-left' valign='top'>
                  <p className='font-semibold'>Sender</p>
                </td>
                <td className='py-2 text-right text-sm text-gray-600'>
                  <p className='text-base font-semibold text-black'>
                    {booking.sender.name}
                  </p>
                  <p className=''>
                    {booking.sender.streetAddress},{' '}
                    {booking.sender.barangayDistrictName},
                  </p>
                  <p className=''>
                    {booking.sender.cityMunicipalityName},{' '}
                    {booking.sender.provinceName}
                  </p>
                  <p className=''>{booking.sender.mobileNumber}</p>
                </td>
              </tr>
              {booking.order.payItemOnDelivery && booking.order.itemAmount && (
                <tr className='text-sm text-gray-600'>
                  <td
                    className='py-4 text-left text-base text-black'
                    valign='top'
                  >
                    <p className='font-semibold'>Item</p>
                  </td>
                  <td className='py-4' align='right'>
                    {booking.order.itemDescription}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className='mt-6 flex items-center justify-center'>
          <TocaLogo className='h-24 w-24' />
        </div>

        <table className='mt-2 w-full border-collapse border-spacing-0 border border-gray-200'>
          <tbody>
            <tr className='border-b border-gray-200'>
              <td
                rowSpan={
                  booking.order.payItemOnDelivery && booking.order.itemAmount
                    ? 5
                    : 4
                }
                className='border border-gray-200'
                align='center'
              >
                <div
                  className='flex h-32 w-32 items-center justify-center p-2'
                  title='QR Code'
                >
                  {isQrCodeLoading ? (
                    <p>Loading QR code...</p>
                  ) : qrCodeUrl ? (
                    <img
                      src={qrCodeUrl}
                      alt='QR Code'
                      className='h-full w-full object-contain'
                    />
                  ) : (
                    <p>Failed to load QR code</p>
                  )}
                </div>
              </td>
              <td className='p-2' align='left'>
                Waybill
              </td>
              <td className='p-2' align='right'>
                {booking.trackingNumber}
              </td>
            </tr>
            <tr className='border-b border-gray-200'>
              <td className='p-2' align='left'>
                Paid By:
              </td>
              <td className='px-2' align='right'>
                {booking.order.payer}
              </td>
            </tr>
            {booking.order.payItemOnDelivery && booking.order.itemAmount && (
              <tr className='border-b border-gray-200'>
                <td className='p-2' align='left'>
                  Item Amount:
                </td>
                <td className='px-2' align='right'>
                  {formatCurrency(booking.order.itemAmount)}
                </td>
              </tr>
            )}
            <tr className='border-b border-gray-200'>
              <td className='p-2' align='left'>
                Delivery Fee:
              </td>
              <td className='px-2' align='right'>
                {formatCurrency(booking.order.deliveryFee)}
              </td>
            </tr>
            <tr className='border-b border-gray-200'>
              <td className='p-2 font-semibold' align='left'>
                Total Amount:
              </td>
              <td className='px-2 font-semibold' align='right'>
                {formatCurrency(booking.order.totalAmount || 0)}
              </td>
            </tr>
          </tbody>
        </table>

        <div className='mt-8 text-right print:hidden'>
          <button
            className='bg-yellow-500 px-6 py-2 font-semibold text-white shadow-md'
            onClick={() => window.print()}
          >
            Print
          </button>
          <button
            className='ml-2 bg-gray-200 px-6 py-2 font-semibold text-gray-500 shadow'
            onClick={() => navigate({ to: '/bookings' })}
          >
            Return
          </button>
        </div>
      </div>
    </div>
  )
}
