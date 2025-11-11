'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { Input } from './input'
import { Label } from './label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'
import { Button } from './button'

// Custom styles for PhoneInput to match bordered design
const phoneInputStyles = `
  .phone-input-custom .PhoneInputInput {
    background: transparent;
    border: 1px solid rgba(89, 59, 44, 0.2);
    border-radius: 1rem;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    font-weight: 600;
    color: #593b2c;
    outline: none;
    transition: border-color 0.2s;
  }
  
  .phone-input-custom .PhoneInputInput:focus {
    border-color: rgba(89, 59, 44, 0.4);
  }
  
  .phone-input-custom .PhoneInputCountrySelect {
    background: transparent;
    border: 1px solid rgba(89, 59, 44, 0.2);
    border-radius: 1rem;
    padding: 0.75rem;
    margin-right: 0.5rem;
    color: #593b2c;
    font-weight: 600;
    min-width: 120px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .phone-input-custom .PhoneInputCountrySelect:focus {
    border-color: rgba(89, 59, 44, 0.4);
    outline: none;
  }
  
  .phone-input-custom .PhoneInputCountrySelectArrow {
    border-color: #593b2c;
  }
  
  .phone-input-custom .PhoneInputCountryIcon {
    margin-right: 0.5rem;
  }
  
  .phone-input-custom .PhoneInputCountrySelectText {
    font-size: 0.875rem;
    font-weight: 600;
    color: #593b2c;
  }
`

// Exchange rates for different currencies to SLL
const exchangeRates = {
  USD: 23.5,
  EUR: 25.8,
  GBP: 29.2
}

export function SendCalculator() {
  const [sendAmount, setSendAmount] = useState('0.00')
  const [receiveAmount, setReceiveAmount] = useState('0.00')
  const [whatsappNumber, setWhatsappNumber] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'crypto'>('card')
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'EUR' | 'GBP'>('USD')
  const [currentStep, setCurrentStep] = useState<1 | 2>(1)

  const calculateReceiveAmount = (amount: string, currency: string) => {
    const numAmount = parseFloat(amount) || 0
    const rate = exchangeRates[currency as keyof typeof exchangeRates]
    return (numAmount * rate).toFixed(2)
  }

  const calculateFee = (amount: string) => {
    const numAmount = parseFloat(amount) || 0
    return (numAmount * 0.01).toFixed(2)
  }

  const handleAmountChange = (value: string) => {
    setSendAmount(value)
    const calculated = calculateReceiveAmount(value, selectedCurrency)
    setReceiveAmount(calculated)
  }

  const handleCurrencyChange = (currency: 'USD' | 'EUR' | 'GBP') => {
    setSelectedCurrency(currency)
    const calculated = calculateReceiveAmount(sendAmount, currency)
    setReceiveAmount(calculated)
  }

  const handleWhatsAppSend = () => {
    const message = `Hi! I want to send ${sendAmount} ${selectedCurrency} via Mocha. They'll receive ${receiveAmount} SLL. Payment method: ${paymentMethod === 'card' ? 'Card' : 'Crypto'}.`
    const encodedMessage = encodeURIComponent(message)
    const phoneNumber = whatsappNumber.replace(/\D/g, '') // Remove non-digits
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: phoneInputStyles }} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-7 lg:p-8 xl:p-9 2xl:p-10 max-w-full sm:max-w-md md:max-w-lg lg:max-w-md xl:max-w-lg 2xl:max-w-xl mx-auto lg:mx-0 w-full"
        style={{
          backgroundColor: '#faf5e9',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(89, 59, 44, 0.2)'
        }}
      >
        {/* Card Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-4 sm:mb-5 md:mb-6 lg:mb-7 2xl:mb-8"
        >
          <div>
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-3xl font-bold" style={{ color: '#593b2c' }}>Send Money</h3>
            <p className="text-xs sm:text-xs md:text-sm lg:text-sm xl:text-base 2xl:text-base font-medium" style={{ color: '#6b5d4f' }}>Fast, secure transfers</p>
          </div>
        </motion.div>

        {currentStep === 1 ? (
          // Step 1: Form Input
          <>
            {/* Send Amount Input */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mb-3 sm:mb-4 md:mb-5 lg:mb-5 2xl:mb-6"
            >
              <Label className="block text-xs sm:text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-base font-medium mb-1.5 sm:mb-2 md:mb-2 lg:mb-2.5 2xl:mb-3 tracking-wide" style={{ color: '#593b2c' }}>
                Amount to send
              </Label>
              <div className="relative flex">
                <Input
                  type="number"
                  value={sendAmount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  placeholder="0.00"
                  className="flex-1 h-11 sm:h-12 md:h-13 lg:h-14 xl:h-15 2xl:h-16 text-lg sm:text-xl md:text-xl lg:text-xl xl:text-2xl 2xl:text-2xl font-semibold bg-transparent border border-[#593b2c]/20 focus:border-[#593b2c]/40 focus:outline-none rounded-l-xl sm:rounded-l-2xl border-r-0"
                  style={{ color: '#593b2c' }}
                />
                <Select value={selectedCurrency} onValueChange={handleCurrencyChange}>
                  <SelectTrigger className="w-20 sm:w-24 md:w-26 lg:w-28 xl:w-30 2xl:w-32 h-11 sm:h-12 md:h-13 lg:h-14 xl:h-15 2xl:h-16 text-sm sm:text-base md:text-base lg:text-base xl:text-lg 2xl:text-lg bg-transparent border border-[#593b2c]/20 focus:border-[#593b2c]/40 focus:outline-none rounded-r-xl sm:rounded-r-2xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>

            {/* Receive Amount Display */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="mb-3 sm:mb-4 md:mb-5 lg:mb-5 2xl:mb-6"
            >
              <Label className="block text-xs sm:text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-base font-medium mb-1.5 sm:mb-2 md:mb-2 lg:mb-2.5 2xl:mb-3 tracking-wide" style={{ color: '#593b2c' }}>
                They'll receive
              </Label>
              <div className="relative">
                <Input
                  type="text"
                  value={`${receiveAmount} SLL`}
                  readOnly
                  className="w-full h-11 sm:h-12 md:h-13 lg:h-14 xl:h-15 2xl:h-16 text-lg sm:text-xl md:text-xl lg:text-xl xl:text-2xl 2xl:text-2xl font-semibold cursor-default bg-transparent border border-[#593b2c]/20 rounded-xl sm:rounded-2xl"
                  style={{ color: '#593b2c' }}
                />
              </div>
            </motion.div>

            {/* WhatsApp Number Input */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="mb-3 sm:mb-4 md:mb-5 lg:mb-5 2xl:mb-6"
            >
              <Label className="block text-xs sm:text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-base font-medium mb-1.5 sm:mb-2 md:mb-2 lg:mb-2.5 2xl:mb-3 tracking-wide" style={{ color: '#593b2c' }}>
                Your WhatsApp number
              </Label>
              <div className="relative">
                <PhoneInput
                  value={whatsappNumber}
                  onChange={(value) => setWhatsappNumber(value || '')}
                  placeholder="WhatsApp number"
                  defaultCountry="US"
                  className="phone-input-custom"
                  withCountryCallingCode={true}
                  international={true}
                  style={{
                    '--PhoneInput-color--focus': '#3b82f6',
                    '--PhoneInputInternationalIconPhone-opacity': '0.8',
                    '--PhoneInputInternationalIconGlobe-opacity': '0.65',
                    '--PhoneInputCountrySelect-marginRight': '0.35em',
                    '--PhoneInputCountrySelectArrow-width': '0.3em',
                    '--PhoneInputCountrySelectArrow-height': '0.3em',
                  } as React.CSSProperties}
                />
              </div>
              <p className="text-xs sm:text-xs md:text-xs lg:text-sm xl:text-sm 2xl:text-sm mt-1.5 sm:mt-2 md:mt-2 lg:mt-2.5 2xl:mt-3 font-medium px-2.5 sm:px-3 md:px-3 lg:px-3.5 xl:px-4 2xl:px-4 py-1.5 sm:py-2 md:py-2 lg:py-2 2xl:py-2.5 rounded-full inline-block" style={{ backgroundColor: '#f5edd3', color: '#593b2c' }}>
                💳 1% flat fee deducted from your card balance
              </p>
            </motion.div>

            {/* Exchange Rate and Fee Display */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.65 }}
              className="mb-3 sm:mb-4 md:mb-5 lg:mb-5 2xl:mb-6"
            >
              <div className="flex justify-between text-xs sm:text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-base text-gray-600">
                <span className="flex items-center gap-1">
                  Exchange Rates
                  <span className="text-xs sm:text-xs md:text-xs lg:text-sm 2xl:text-sm">ⓘ</span>
                </span>
                <span>Fee = {calculateFee(sendAmount)} {selectedCurrency}</span>
              </div>
            </motion.div>

            {/* Service Unavailable Message */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.65 }}
              className="mb-3 sm:mb-4 md:mb-4 lg:mb-4 2xl:mb-5 text-center"
            >
              <p className="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-base font-semibold px-3 sm:px-4 md:px-4 lg:px-5 xl:px-6 2xl:px-6 py-2 sm:py-2.5 md:py-2.5 lg:py-3 2xl:py-3 rounded-lg" style={{ backgroundColor: '#f5edd3', color: '#593b2c' }}>
                ⏳ Service launching soon! We're working hard to bring you the best money transfer experience.
              </p>
            </motion.div>

            {/* Next Button - Disabled */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              <Button
                disabled
                className="w-full text-base sm:text-lg md:text-lg lg:text-lg xl:text-xl 2xl:text-xl py-3 sm:py-4 md:py-4 lg:py-4.5 2xl:py-5 rounded-full font-bold uppercase tracking-wide flex items-center justify-center gap-2 h-12 sm:h-14 md:h-14 lg:h-15 2xl:h-16 cursor-not-allowed opacity-50"
                style={{
                  backgroundColor: '#9ca3af',
                  color: '#ffffff',
                  boxShadow: 'none'
                }}
              >
                Next
              </Button>
            </motion.div>
          </>
        ) : (
          // Step 2: Transaction Summary
          <>
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mb-3 sm:mb-4 md:mb-5 lg:mb-5 2xl:mb-6"
            >
              <Button
                onClick={() => setCurrentStep(1)}
                variant="outline"
                className="text-xs sm:text-sm md:text-sm lg:text-base 2xl:text-base rounded-full h-9 sm:h-10 md:h-11 lg:h-12 2xl:h-12"
                style={{ color: '#593b2c', borderColor: '#593b2c' }}
              >
                ← Back
              </Button>
            </motion.div>

            {/* Transaction Summary */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mb-4 sm:mb-6 md:mb-6 lg:mb-7 2xl:mb-8"
            >
              <h4 className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl 2xl:text-2xl font-bold mb-3 sm:mb-4 md:mb-5 lg:mb-5 2xl:mb-6" style={{ color: '#593b2c' }}>Transaction Summary</h4>
              <div className="space-y-2 sm:space-y-3 md:space-y-3 lg:space-y-3 2xl:space-y-4">
                <div className="flex justify-between">
                  <span className="text-xs sm:text-sm md:text-sm lg:text-base 2xl:text-base" style={{ color: '#6b5d4f' }}>Send amount:</span>
                  <span className="font-semibold text-sm sm:text-base md:text-base lg:text-lg 2xl:text-lg" style={{ color: '#593b2c' }}>{sendAmount} {selectedCurrency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs sm:text-sm md:text-sm lg:text-base 2xl:text-base" style={{ color: '#6b5d4f' }}>They receive:</span>
                  <span className="font-semibold text-sm sm:text-base md:text-base lg:text-lg 2xl:text-lg" style={{ color: '#593b2c' }}>{receiveAmount} SLL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs sm:text-sm md:text-sm lg:text-base 2xl:text-base" style={{ color: '#6b5d4f' }}>WhatsApp:</span>
                  <span className="font-semibold text-sm sm:text-base md:text-base lg:text-lg 2xl:text-lg" style={{ color: '#593b2c' }}>{whatsappNumber || 'Not provided'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs sm:text-sm md:text-sm lg:text-base 2xl:text-base" style={{ color: '#6b5d4f' }}>Fee:</span>
                  <span className="font-semibold text-sm sm:text-base md:text-base lg:text-lg 2xl:text-lg" style={{ color: '#593b2c' }}>{calculateFee(sendAmount)} {selectedCurrency}</span>
                </div>
              </div>
            </motion.div>

            {/* Payment Method Selection */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="mb-4 sm:mb-6 md:mb-6 lg:mb-7 2xl:mb-8"
            >
              <Label className="block text-xs sm:text-sm md:text-sm lg:text-sm xl:text-base 2xl:text-base font-medium mb-1.5 sm:mb-2 md:mb-2 lg:mb-2.5 2xl:mb-3 tracking-wide" style={{ color: '#593b2c' }}>
                Payment Method
              </Label>
              <Select value={paymentMethod} onValueChange={(value: 'card' | 'crypto') => setPaymentMethod(value)}>
                <SelectTrigger className="w-full h-11 sm:h-12 md:h-13 lg:h-14 xl:h-15 2xl:h-16 text-sm sm:text-base md:text-base lg:text-base xl:text-lg 2xl:text-lg bg-transparent border border-[#593b2c]/20 focus:border-[#593b2c]/40 focus:outline-none rounded-xl sm:rounded-2xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#faf5e9] border border-[#593b2c]/20">
                  <SelectItem value="card">💳 Card Payment</SelectItem>
                  <SelectItem value="crypto">₿ Pay with Crypto</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            {/* Send Money Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <Button
                onClick={handleWhatsAppSend}
                className="w-full text-white text-base sm:text-lg md:text-lg lg:text-lg xl:text-xl 2xl:text-xl py-3 sm:py-4 md:py-4 lg:py-4.5 2xl:py-5 rounded-full font-bold transition-all duration-300 transform hover:-translate-y-1 uppercase tracking-wide flex items-center justify-center gap-2 h-12 sm:h-14 md:h-14 lg:h-15 2xl:h-16"
                style={{
                  backgroundColor: '#593b2c',
                  boxShadow: '0 20px 25px -5px rgba(89, 59, 44, 0.5)'
                }}
              >
                <MessageCircle size={18} className="sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-5 lg:h-5 2xl:w-6 2xl:h-6" />
                Send Money
              </Button>
            </motion.div>
          </>
        )}
      </motion.div>
    </>
  )
}
