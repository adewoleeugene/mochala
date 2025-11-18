'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
    border: 1.5px solid rgba(89, 59, 44, 0.2);
    border-radius: 1rem;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    font-weight: 600;
    color: #593b2c;
    outline: none;
    transition: all 0.2s ease;
  }

  .phone-input-custom .PhoneInputInput:focus {
    border-color: rgba(89, 59, 44, 0.5);
    box-shadow: 0 0 0 3px rgba(89, 59, 44, 0.1);
  }

  .phone-input-custom .PhoneInputCountrySelect {
    background: transparent;
    border: 1.5px solid rgba(89, 59, 44, 0.2);
    border-radius: 1rem;
    padding: 0.75rem;
    margin-right: 0.5rem;
    color: #593b2c;
    font-weight: 600;
    min-width: 120px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.2s ease;
  }

  .phone-input-custom .PhoneInputCountrySelect:focus {
    border-color: rgba(89, 59, 44, 0.5);
    outline: none;
    box-shadow: 0 0 0 3px rgba(89, 59, 44, 0.1);
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
  const [sendAmount, setSendAmount] = useState('')
  const [receiveAmount, setReceiveAmount] = useState('')
  const [whatsappNumber, setWhatsappNumber] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'crypto'>('card')
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'EUR' | 'GBP'>('USD')
  const [currentStep, setCurrentStep] = useState<1 | 2>(1)
  const [showPhoneNumber, setShowPhoneNumber] = useState(false)
  const [showFees, setShowFees] = useState(false)

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

    // Show phone number field after amount is entered
    if (parseFloat(value) > 0 && !showPhoneNumber) {
      setTimeout(() => setShowPhoneNumber(true), 300)
    }
  }

  const handleCurrencyChange = (currency: 'USD' | 'EUR' | 'GBP') => {
    setSelectedCurrency(currency)
    const calculated = calculateReceiveAmount(sendAmount, currency)
    setReceiveAmount(calculated)
  }

  const handlePhoneNumberChange = (value: string | undefined) => {
    setWhatsappNumber(value || '')

    // Show fees after phone number is entered
    if (value && value.length > 5 && !showFees) {
      setTimeout(() => setShowFees(true), 300)
    }
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
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-2xl sm:rounded-3xl p-6 sm:p-7 md:p-8 lg:p-9 xl:p-10 2xl:p-11 max-w-full sm:max-w-md md:max-w-lg lg:max-w-md xl:max-w-lg 2xl:max-w-xl mx-auto lg:mx-0 w-full"
        style={{
          backgroundColor: '#faf5e9',
          boxShadow: '0 20px 60px -15px rgba(0, 0, 0, 0.25), 0 10px 30px -10px rgba(0, 0, 0, 0.1)',
          border: '1.5px solid rgba(89, 59, 44, 0.15)'
        }}
      >
        {/* Card Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5 sm:mb-6 md:mb-7 lg:mb-8 2xl:mb-9"
        >
          <div>
            <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-4xl font-bold mb-1.5" style={{ color: '#593b2c' }}>Send Money</h3>
            <p className="text-sm sm:text-sm md:text-base lg:text-base xl:text-base 2xl:text-lg font-medium" style={{ color: '#6b5d4f', opacity: 0.8 }}>Fast, secure transfers</p>
          </div>
        </motion.div>

        {currentStep === 1 ? (
          // Step 1: Form Input
          <>
            {/* Send Amount Input */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mb-4 sm:mb-5 md:mb-5 lg:mb-6 2xl:mb-7"
            >
              <Label className="block text-xs sm:text-sm md:text-sm lg:text-base 2xl:text-base font-semibold mb-2 sm:mb-2.5 md:mb-2.5 lg:mb-3 2xl:mb-3 tracking-wide" style={{ color: '#593b2c' }}>
                Amount to send
              </Label>
              <div className="relative flex">
                <Input
                  type="number"
                  value={sendAmount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  placeholder="0.00"
                  className="flex-1 h-12 sm:h-[3.25rem] md:h-14 lg:h-14 xl:h-[3.75rem] 2xl:h-16 text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl font-semibold bg-transparent border-[1.5px] border-[#593b2c]/20 focus:border-[#593b2c]/50 focus:ring-2 focus:ring-[#593b2c]/10 transition-all duration-200 rounded-l-xl sm:rounded-l-2xl border-r-0"
                  style={{ color: '#593b2c' }}
                />
                <Select value={selectedCurrency} onValueChange={handleCurrencyChange}>
                  <SelectTrigger className="w-20 sm:w-24 md:w-[6.5rem] lg:w-28 xl:w-[7.5rem] 2xl:w-32 h-12 sm:h-[3.25rem] md:h-14 lg:h-14 xl:h-[3.75rem] 2xl:h-16 text-sm sm:text-base md:text-base lg:text-lg xl:text-lg 2xl:text-xl font-semibold bg-transparent border-[1.5px] border-[#593b2c]/20 focus:border-[#593b2c]/50 focus:ring-2 focus:ring-[#593b2c]/10 transition-all duration-200 rounded-r-xl sm:rounded-r-2xl">
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
              transition={{ duration: 0.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mb-4 sm:mb-5 md:mb-5 lg:mb-6 2xl:mb-7"
            >
              <Label className="block text-xs sm:text-sm md:text-sm lg:text-base 2xl:text-base font-semibold mb-2 sm:mb-2.5 md:mb-2.5 lg:mb-3 2xl:mb-3 tracking-wide" style={{ color: '#593b2c' }}>
                They'll receive
              </Label>
              <div className="relative">
                <Input
                  type="text"
                  value={receiveAmount ? `${receiveAmount} SLL` : ''}
                  placeholder="0.00 SLL"
                  readOnly
                  className="w-full h-12 sm:h-[3.25rem] md:h-14 lg:h-14 xl:h-[3.75rem] 2xl:h-16 text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl font-semibold cursor-default bg-[#593b2c]/5 border-[1.5px] border-[#593b2c]/20 rounded-xl sm:rounded-2xl transition-all duration-200"
                  style={{ color: '#593b2c' }}
                />
              </div>
            </motion.div>

            {/* WhatsApp Number Input - Shows after amount is entered */}
            <AnimatePresence>
              {showPhoneNumber && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-4 sm:mb-5 md:mb-5 lg:mb-6 2xl:mb-7"
                >
                  <Label className="block text-xs sm:text-sm md:text-sm lg:text-base 2xl:text-base font-semibold mb-2 sm:mb-2.5 md:mb-2.5 lg:mb-3 2xl:mb-3 tracking-wide" style={{ color: '#593b2c' }}>
                    Your WhatsApp number
                  </Label>
                  <div className="relative">
                    <PhoneInput
                      value={whatsappNumber}
                      onChange={handlePhoneNumberChange}
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
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xs sm:text-xs md:text-sm lg:text-sm xl:text-sm 2xl:text-sm mt-2.5 sm:mt-3 md:mt-3 lg:mt-3.5 2xl:mt-4 font-medium px-3 sm:px-3.5 md:px-4 lg:px-4 xl:px-4.5 2xl:px-5 py-2 sm:py-2 md:py-2.5 lg:py-2.5 2xl:py-3 rounded-full inline-block"
                    style={{ backgroundColor: '#f5edd3', color: '#593b2c' }}
                  >
                    💳 1% flat fee deducted from your card balance
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Exchange Rate and Fee Display - Shows after phone number is entered */}
            <AnimatePresence>
              {showFees && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-4 sm:mb-5 md:mb-5 lg:mb-6 2xl:mb-7"
                >
                  <div className="flex justify-between text-xs sm:text-sm md:text-sm lg:text-base 2xl:text-base font-medium" style={{ color: '#6b5d4f' }}>
                    <span className="flex items-center gap-1.5">
                      Exchange Rates
                      <span className="text-xs sm:text-xs md:text-sm 2xl:text-sm opacity-70">ⓘ</span>
                    </span>
                    <span className="font-semibold" style={{ color: '#593b2c' }}>Fee = {calculateFee(sendAmount)} {selectedCurrency}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Service Unavailable Message - Shows after fees */}
            <AnimatePresence>
              {showFees && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-4 sm:mb-5 md:mb-5 lg:mb-5 2xl:mb-6 text-center"
                >
                  <p className="text-xs sm:text-sm md:text-sm lg:text-base xl:text-base 2xl:text-lg font-semibold px-4 sm:px-5 md:px-5 lg:px-6 xl:px-6 2xl:px-7 py-3 sm:py-3.5 md:py-3.5 lg:py-4 2xl:py-4.5 rounded-xl" style={{ backgroundColor: '#f5edd3', color: '#593b2c' }}>
                    ⏳ Service launching soon! We're working hard to bring you the best money transfer experience.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next Button - Shows after fees - Disabled */}
            <AnimatePresence>
              {showFees && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Button
                    disabled
                    className="w-full text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl py-3.5 sm:py-4 md:py-4.5 lg:py-5 2xl:py-5.5 rounded-full font-bold uppercase tracking-wide flex items-center justify-center gap-2 h-[3.25rem] sm:h-14 md:h-[3.75rem] lg:h-16 2xl:h-[4.25rem] cursor-not-allowed opacity-50 transition-all duration-200"
                    style={{
                      backgroundColor: '#9ca3af',
                      color: '#ffffff',
                      boxShadow: 'none'
                    }}
                  >
                    Next
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          // Step 2: Transaction Summary
          <>
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mb-4 sm:mb-5 md:mb-6 lg:mb-6 2xl:mb-7"
            >
              <Button
                onClick={() => setCurrentStep(1)}
                variant="outline"
                className="text-xs sm:text-sm md:text-sm lg:text-base 2xl:text-base rounded-full h-10 sm:h-11 md:h-12 lg:h-12 2xl:h-[3.25rem] font-medium transition-all duration-200"
                style={{ color: '#593b2c', borderColor: '#593b2c' }}
              >
                ← Back
              </Button>
            </motion.div>

            {/* Transaction Summary */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mb-5 sm:mb-6 md:mb-7 lg:mb-8 2xl:mb-9"
            >
              <h4 className="text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl font-bold mb-4 sm:mb-5 md:mb-5 lg:mb-6 2xl:mb-7" style={{ color: '#593b2c' }}>Transaction Summary</h4>
              <div className="space-y-3 sm:space-y-3.5 md:space-y-4 lg:space-y-4 2xl:space-y-5">
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm md:text-sm lg:text-base 2xl:text-base font-medium" style={{ color: '#6b5d4f' }}>Send amount:</span>
                  <span className="font-semibold text-sm sm:text-base md:text-base lg:text-lg 2xl:text-xl" style={{ color: '#593b2c' }}>{sendAmount} {selectedCurrency}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm md:text-sm lg:text-base 2xl:text-base font-medium" style={{ color: '#6b5d4f' }}>They receive:</span>
                  <span className="font-semibold text-sm sm:text-base md:text-base lg:text-lg 2xl:text-xl" style={{ color: '#593b2c' }}>{receiveAmount} SLL</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm md:text-sm lg:text-base 2xl:text-base font-medium" style={{ color: '#6b5d4f' }}>WhatsApp:</span>
                  <span className="font-semibold text-sm sm:text-base md:text-base lg:text-lg 2xl:text-xl" style={{ color: '#593b2c' }}>{whatsappNumber || 'Not provided'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm md:text-sm lg:text-base 2xl:text-base font-medium" style={{ color: '#6b5d4f' }}>Fee:</span>
                  <span className="font-semibold text-sm sm:text-base md:text-base lg:text-lg 2xl:text-xl" style={{ color: '#593b2c' }}>{calculateFee(sendAmount)} {selectedCurrency}</span>
                </div>
              </div>
            </motion.div>

            {/* Payment Method Selection */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mb-5 sm:mb-6 md:mb-7 lg:mb-8 2xl:mb-9"
            >
              <Label className="block text-xs sm:text-sm md:text-sm lg:text-base 2xl:text-base font-semibold mb-2 sm:mb-2.5 md:mb-2.5 lg:mb-3 2xl:mb-3 tracking-wide" style={{ color: '#593b2c' }}>
                Payment Method
              </Label>
              <Select value={paymentMethod} onValueChange={(value: 'card' | 'crypto') => setPaymentMethod(value)}>
                <SelectTrigger className="w-full h-12 sm:h-[3.25rem] md:h-14 lg:h-14 xl:h-[3.75rem] 2xl:h-16 text-sm sm:text-base md:text-base lg:text-lg xl:text-lg 2xl:text-xl font-semibold bg-transparent border-[1.5px] border-[#593b2c]/20 focus:border-[#593b2c]/50 focus:ring-2 focus:ring-[#593b2c]/10 transition-all duration-200 rounded-xl sm:rounded-2xl">
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
              transition={{ duration: 0.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Button
                  onClick={handleWhatsAppSend}
                  className="w-full text-white text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl py-3.5 sm:py-4 md:py-4.5 lg:py-5 2xl:py-5.5 rounded-full font-bold transition-all duration-300 uppercase tracking-wide flex items-center justify-center gap-2.5 h-[3.25rem] sm:h-14 md:h-[3.75rem] lg:h-16 2xl:h-[4.25rem]"
                  style={{
                    backgroundColor: '#593b2c',
                    boxShadow: '0 20px 40px -10px rgba(89, 59, 44, 0.5)'
                  }}
                >
                  <MessageCircle size={18} className="sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 2xl:w-7 2xl:h-7" />
                  Send Money
                </Button>
              </motion.div>
            </motion.div>
          </>
        )}
      </motion.div>
    </>
  )
}
