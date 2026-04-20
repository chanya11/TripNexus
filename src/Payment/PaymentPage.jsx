import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext.jsx";
import styles from "./PaymentPage.module.css";

const steps = [
  { number: 1, title: "Your selection" },
  { number: 2, title: "Your details" },
  { number: 3, title: "Finish booking" },
];

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  paymentMethod: "card",
  cardNumber: "",
  expiryDate: "",
  cvv: "",
  cardholderName: "",
  upiId: "",
  paypalEmail: "",
  billingAddress: {
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
  },
};

function formatInr(value) {
  return `Rs.${Math.round(value).toLocaleString("en-IN")}`;
}

function formatMetaValue(value) {
  return value || "-";
}

export default function PaymentPage() {
  const navigate = useNavigate();
  const { bookings, removeBooking, clearBookings } = useBooking();
  const [currentStep, setCurrentStep] = useState(bookings.length > 0 ? 1 : 1);
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const totalAmount = useMemo(
    () => bookings.reduce((total, booking) => total + Number(booking.amountInInr || 0), 0),
    [bookings]
  );

  const maskedCardNumber = formData.cardNumber ? `•••• •••• •••• ${formData.cardNumber.replace(/\s/g, "").slice(-4)}` : "Not provided";
  const paymentDescriptor = {
    card: maskedCardNumber,
    upi: formData.upiId || "Not provided",
    paypal: formData.paypalEmail || "Not provided",
  };

  const updateField = (name, value) => {
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((current) => ({
        ...current,
        [parent]: {
          ...current[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((current) => ({ ...current, [name]: value }));
    }

    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const handleCardNumberChange = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    const parts = digits.match(/.{1,4}/g) || [];
    updateField("cardNumber", parts.join(" "));
  };

  const handleExpiryChange = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    const formatted = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
    updateField("expiryDate", formatted);
  };

  const validateStepTwo = () => {
    const nextErrors = {};

    if (!formData.firstName.trim()) nextErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) nextErrors.lastName = "Last name is required";

    if (!formData.email.trim()) {
      nextErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nextErrors.email = "Enter a valid email address";
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      nextErrors.phone = "Phone number must be exactly 10 digits";
    }

    if (formData.paymentMethod === "card") {
      if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
        nextErrors.cardNumber = "Card number must be 16 digits";
      }
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
        nextErrors.expiryDate = "Use MM/YY format";
      }
      if (!/^\d{3,4}$/.test(formData.cvv)) {
        nextErrors.cvv = "CVV must be 3 or 4 digits";
      }
      if (!formData.cardholderName.trim()) {
        nextErrors.cardholderName = "Cardholder name is required";
      }
    }

    if (formData.paymentMethod === "upi") {
      if (!/^[\w.-]{2,256}@[a-zA-Z]{2,64}$/.test(formData.upiId.trim())) {
        nextErrors.upiId = "Enter a valid UPI ID";
      }
    }

    if (formData.paymentMethod === "paypal") {
      if (!/\S+@\S+\.\S+/.test(formData.paypalEmail.trim())) {
        nextErrors.paypalEmail = "Enter a valid PayPal email";
      }
    }

    if (!formData.billingAddress.street.trim()) nextErrors["billingAddress.street"] = "Street address is required";
    if (!formData.billingAddress.city.trim()) nextErrors["billingAddress.city"] = "City is required";
    if (!formData.billingAddress.state.trim()) nextErrors["billingAddress.state"] = "State is required";
    if (!/^[A-Za-z0-9 -]{4,10}$/.test(formData.billingAddress.zipCode.trim())) {
      nextErrors["billingAddress.zipCode"] = "Postal code must be 4 to 10 characters";
    }
    if (!formData.billingAddress.country.trim()) nextErrors["billingAddress.country"] = "Country is required";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const placeBooking = async () => {
    if (!termsAccepted) {
      setErrors((current) => ({ ...current, terms: "Please accept the terms and privacy policy" }));
      return;
    }

    setIsProcessing(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2200));
      setIsCompleted(true);
      clearBookings();
    } finally {
      setIsProcessing(false);
    }
  };

  if (isCompleted) {
    return (
      <div className={styles.paymentContainer}>
        <div className={styles.successMessage}>
          <div className={styles.successIcon}>✓</div>
          <h2>Booking confirmed</h2>
          <p>Your reservation and payment details were saved successfully.</p>
          <button type="button" className={styles.primaryButton} onClick={() => navigate("/")}>
            Back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.paymentContainer}>
      <div className={styles.paymentWrapper}>
        <aside className={styles.summaryPanel}>
          <div className={styles.summaryHeader}>
            <span className={styles.eyebrow}>Order summary</span>
            <h2>Your booking</h2>
            <p>Everything you reserved appears here with the final amount to be paid.</p>
          </div>

          {bookings.length === 0 ? (
            <div className={styles.emptyState}>
              <strong>No reservation selected yet</strong>
              <p>Select a hotel, taxi, flight, package or attraction first and then come back to checkout.</p>
              <button type="button" className={styles.secondaryButton} onClick={() => navigate("/")}>
                Go to home
              </button>
            </div>
          ) : (
            <>
              <div className={styles.bookingList}>
                {bookings.map((booking) => (
                  <article key={booking.category} className={styles.bookingCard}>
                    <div className={styles.bookingCardTop}>
                      <div>
                        <span className={styles.bookingType}>{booking.category}</span>
                        <h3>{booking.title}</h3>
                        <p>{booking.subtitle}</p>
                      </div>
                      <strong>{formatInr(booking.amountInInr)}</strong>
                    </div>

                    <p className={styles.bookingDescription}>{booking.description}</p>

                    <div className={styles.metaGrid}>
                      {booking.meta?.map((item) => (
                        <div key={`${booking.category}-${item.label}`}>
                          <span>{item.label}</span>
                          <strong>{formatMetaValue(item.value)}</strong>
                        </div>
                      ))}
                    </div>

                    <div className={styles.cardActions}>
                      <button type="button" className={styles.linkButton} onClick={() => navigate(booking.editPath)}>
                        Change
                      </button>
                      <button type="button" className={styles.linkButtonDanger} onClick={() => removeBooking(booking.category)}>
                        Remove
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <div className={styles.totalBox}>
                <span>Total amount</span>
                <strong>{formatInr(totalAmount)}</strong>
              </div>
            </>
          )}
        </aside>

        <section className={styles.checkoutPanel}>
          <div className={styles.stepper}>
            {steps.map((step) => (
              <div key={step.number} className={`${styles.stepItem} ${currentStep >= step.number ? styles.stepActive : ""}`}>
                <span>{step.number}</span>
                <div>
                  <strong>{step.title}</strong>
                </div>
              </div>
            ))}
          </div>

          {currentStep === 1 && (
            <div className={styles.stepSection}>
              <div className={styles.sectionHeader}>
                <div>
                  <span className={styles.eyebrow}>Step 1</span>
                  <h1>Review your selection</h1>
                  <p>Check each reserved item, remove anything you do not want, or go back to change the reservation.</p>
                </div>
              </div>

              <div className={styles.reviewGrid}>
                {bookings.map((booking) => (
                  <article key={`review-${booking.category}`} className={styles.reviewCard}>
                    <div className={styles.reviewCardHeader}>
                      <div>
                        <span className={styles.bookingType}>{booking.category}</span>
                        <h3>{booking.title}</h3>
                        <p>{booking.subtitle}</p>
                      </div>
                      <strong>{formatInr(booking.amountInInr)}</strong>
                    </div>
                    <p className={styles.bookingDescription}>{booking.description}</p>
                    <div className={styles.metaGrid}>
                      {booking.meta?.map((item) => (
                        <div key={`review-${booking.category}-${item.label}`}>
                          <span>{item.label}</span>
                          <strong>{formatMetaValue(item.value)}</strong>
                        </div>
                      ))}
                    </div>
                    <div className={styles.cardActions}>
                      <button type="button" className={styles.linkButton} onClick={() => navigate(booking.editPath)}>
                        Change reservation
                      </button>
                      <button type="button" className={styles.linkButtonDanger} onClick={() => removeBooking(booking.category)}>
                        Remove reservation
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <div className={styles.stepActions}>
                <button type="button" className={styles.secondaryButton} onClick={() => navigate("/")}>
                  Add more booking items
                </button>
                <button
                  type="button"
                  className={styles.primaryButton}
                  disabled={bookings.length === 0}
                  onClick={() => setCurrentStep(2)}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className={styles.stepSection}>
              <div className={styles.sectionHeader}>
                <div>
                  <span className={styles.eyebrow}>Step 2</span>
                  <h1>Enter your details</h1>
                  <p>Choose your payment method first, then complete the required details and billing address.</p>
                </div>
              </div>

              <div className={styles.infoBanner}>Almost done. Fill in the required payment, guest and billing details.</div>

              <div className={styles.formSection}>
                <h3>Guest details</h3>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="firstName">First name</label>
                    <input id="firstName" value={formData.firstName} onChange={(event) => updateField("firstName", event.target.value)} />
                    {errors.firstName && <span className={styles.errorText}>{errors.firstName}</span>}
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="lastName">Last name</label>
                    <input id="lastName" value={formData.lastName} onChange={(event) => updateField("lastName", event.target.value)} />
                    {errors.lastName && <span className={styles.errorText}>{errors.lastName}</span>}
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email address</label>
                    <input id="email" type="email" value={formData.email} onChange={(event) => updateField("email", event.target.value)} />
                    {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="phone">Phone number</label>
                    <input
                      id="phone"
                      inputMode="numeric"
                      value={formData.phone}
                      onChange={(event) => updateField("phone", event.target.value.replace(/\D/g, "").slice(0, 10))}
                    />
                    {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
                  </div>
                </div>
              </div>

              <div className={styles.formSection}>
                <h3>Payment method</h3>
                <div className={styles.methodOptions}>
                  {[
                    ["card", "Credit or debit card"],
                    ["upi", "UPI"],
                    ["paypal", "PayPal"],
                  ].map(([value, label]) => (
                    <label key={value} className={`${styles.methodOption} ${formData.paymentMethod === value ? styles.activeMethod : ""}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={value}
                        checked={formData.paymentMethod === value}
                        onChange={(event) => updateField("paymentMethod", event.target.value)}
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>

                {formData.paymentMethod === "card" && (
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label htmlFor="cardNumber">Card number</label>
                      <input
                        id="cardNumber"
                        inputMode="numeric"
                        maxLength="19"
                        value={formData.cardNumber}
                        onChange={(event) => handleCardNumberChange(event.target.value)}
                        placeholder="1234 5678 9012 3456"
                      />
                      {errors.cardNumber && <span className={styles.errorText}>{errors.cardNumber}</span>}
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="expiryDate">Expiry date</label>
                      <input
                        id="expiryDate"
                        inputMode="numeric"
                        maxLength="5"
                        value={formData.expiryDate}
                        onChange={(event) => handleExpiryChange(event.target.value)}
                        placeholder="MM/YY"
                      />
                      {errors.expiryDate && <span className={styles.errorText}>{errors.expiryDate}</span>}
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="cvv">CVV</label>
                      <input
                        id="cvv"
                        inputMode="numeric"
                        maxLength="4"
                        value={formData.cvv}
                        onChange={(event) => updateField("cvv", event.target.value.replace(/\D/g, "").slice(0, 4))}
                        placeholder="123"
                      />
                      {errors.cvv && <span className={styles.errorText}>{errors.cvv}</span>}
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="cardholderName">Cardholder name</label>
                      <input id="cardholderName" value={formData.cardholderName} onChange={(event) => updateField("cardholderName", event.target.value)} />
                      {errors.cardholderName && <span className={styles.errorText}>{errors.cardholderName}</span>}
                    </div>
                  </div>
                )}

                {formData.paymentMethod === "upi" && (
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label htmlFor="upiId">UPI ID</label>
                      <input id="upiId" value={formData.upiId} onChange={(event) => updateField("upiId", event.target.value.trim())} placeholder="name@bank" />
                      {errors.upiId && <span className={styles.errorText}>{errors.upiId}</span>}
                    </div>
                  </div>
                )}

                {formData.paymentMethod === "paypal" && (
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label htmlFor="paypalEmail">PayPal email</label>
                      <input
                        id="paypalEmail"
                        type="email"
                        value={formData.paypalEmail}
                        onChange={(event) => updateField("paypalEmail", event.target.value)}
                        placeholder="paypal@example.com"
                      />
                      {errors.paypalEmail && <span className={styles.errorText}>{errors.paypalEmail}</span>}
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.formSection}>
                <h3>Billing address</h3>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="street">Street address</label>
                    <input id="street" value={formData.billingAddress.street} onChange={(event) => updateField("billingAddress.street", event.target.value)} />
                    {errors["billingAddress.street"] && <span className={styles.errorText}>{errors["billingAddress.street"]}</span>}
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="city">City</label>
                    <input id="city" value={formData.billingAddress.city} onChange={(event) => updateField("billingAddress.city", event.target.value)} />
                    {errors["billingAddress.city"] && <span className={styles.errorText}>{errors["billingAddress.city"]}</span>}
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="state">State</label>
                    <input id="state" value={formData.billingAddress.state} onChange={(event) => updateField("billingAddress.state", event.target.value)} />
                    {errors["billingAddress.state"] && <span className={styles.errorText}>{errors["billingAddress.state"]}</span>}
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="zipCode">Postal code</label>
                    <input
                      id="zipCode"
                      maxLength="10"
                      value={formData.billingAddress.zipCode}
                      onChange={(event) => updateField("billingAddress.zipCode", event.target.value.slice(0, 10))}
                    />
                    {errors["billingAddress.zipCode"] && <span className={styles.errorText}>{errors["billingAddress.zipCode"]}</span>}
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="country">Country</label>
                    <input id="country" value={formData.billingAddress.country} onChange={(event) => updateField("billingAddress.country", event.target.value)} />
                    {errors["billingAddress.country"] && <span className={styles.errorText}>{errors["billingAddress.country"]}</span>}
                  </div>
                </div>
              </div>

              <div className={styles.stepActions}>
                <button type="button" className={styles.secondaryButton} onClick={() => setCurrentStep(1)}>
                  Back
                </button>
                <button
                  type="button"
                  className={styles.primaryButton}
                  onClick={() => {
                    if (validateStepTwo()) {
                      setCurrentStep(3);
                    }
                  }}
                >
                  Continue to final step
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className={styles.stepSection}>
              <div className={styles.sectionHeader}>
                <div>
                  <span className={styles.eyebrow}>Step 3</span>
                  <h1>Finish booking</h1>
                  <p>Review the final payment details and place your booking.</p>
                </div>
              </div>

              <div className={styles.confirmationGrid}>
                <div className={styles.confirmationCard}>
                  <h3>Guest details</h3>
                  <p>{formData.firstName} {formData.lastName}</p>
                  <p>{formData.email}</p>
                  <p>{formData.phone}</p>
                </div>

                <div className={styles.confirmationCard}>
                  <h3>Payment method</h3>
                  <p>{formData.paymentMethod.toUpperCase()}</p>
                  <p>{paymentDescriptor[formData.paymentMethod]}</p>
                </div>

                <div className={styles.confirmationCard}>
                  <h3>Billing address</h3>
                  <p>{formData.billingAddress.street}</p>
                  <p>{formData.billingAddress.city}, {formData.billingAddress.state}</p>
                  <p>{formData.billingAddress.zipCode}, {formData.billingAddress.country}</p>
                </div>

                <div className={styles.confirmationCard}>
                  <h3>Total to pay</h3>
                  <p className={styles.finalAmount}>{formatInr(totalAmount)}</p>
                </div>
              </div>

              <div className={styles.termsSection}>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" checked={termsAccepted} onChange={(event) => { setTermsAccepted(event.target.checked); setErrors((current) => ({ ...current, terms: "" })); }} />
                  <span>I agree to the Terms and Conditions and Privacy Policy.</span>
                </label>
                {errors.terms && <span className={styles.errorText}>{errors.terms}</span>}
              </div>

              <div className={styles.stepActions}>
                <button type="button" className={styles.secondaryButton} onClick={() => setCurrentStep(2)}>
                  Back
                </button>
                <button type="button" className={styles.primaryButton} disabled={isProcessing || bookings.length === 0} onClick={placeBooking}>
                  {isProcessing ? "Processing..." : `Pay ${formatInr(totalAmount)}`}
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
