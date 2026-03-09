"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, FileText, Users } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { contactFormSchema, type ContactFormData } from "@/schema/contact";

const SUBJECT_OPTIONS = [
  { value: "general", label: "General Inquiry" },
  { value: "press", label: "Press & Media" },
  { value: "partnership", label: "Partnership" },
  { value: "data", label: "Data Access" },
  { value: "other", label: "Other" },
];

export function ContactContentSection() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Form submitted:", data);

      toast.success("Message sent successfully!", {
        description: "We'll get back to you as soon as possible.",
      });

      reset();
    } catch {
      toast.error("Failed to send message", {
        description: "Please try again later.",
      });
    }
  };

  return (
    <div className="border-b border-[#e4e4e7] bg-white section-px pb-16 pt-12 md:pb-20 md:pt-16 lg:pb-24 lg:pt-20 xl:pb-[97px] xl:pt-[95px]">
      <div className="w-full max-w-[1600px] mx-auto">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
          {/* Left Side - Contact Info */}
          <div className="flex-1 space-y-6">
            {/* Heading */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-[-1px] text-[#09090b] lg:text-[48px] xl:text-[52px] lg:leading-[60px] xl:leading-[64px]">
                Contact Channels
              </h2>
              <p className="text-lg leading-7 text-[#09090b] lg:text-2xl xl:text-[28px] lg:leading-[36px] xl:leading-[40px]">
                Choose the right channel to get the fastest
                <br />
                response from our team.
              </p>
            </div>

            {/* Contact Channels */}
            <div className="space-y-8 border-b border-[#e4e4e7] pb-10 pt-6">
              {/* General Inquiries */}
              <div className="flex gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f4f4f5]">
                  <Mail className="h-6 w-6 text-[#09090b]" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold leading-8 text-[#09090b]">
                    General Inquiries
                  </h3>
                  <p className="text-base leading-[25.6px] text-[#52525b]">
                    For questions about the platform or methodology.
                  </p>
                  <a
                    href="mailto:hello@creatorcharts.org"
                    className="inline-block border-b border-[#e4e4e7] text-base font-semibold leading-[25.6px] text-[#09090b] hover:border-[#09090b]"
                  >
                    hello@creatorcharts.org
                  </a>
                </div>
              </div>

              {/* Press & Media */}
              <div className="flex gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f4f4f5]">
                  <FileText className="h-6 w-6 text-[#09090b]" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold leading-8 text-[#09090b]">
                    Press &amp; Media
                  </h3>
                  <p className="text-base leading-[25.6px] text-[#52525b]">
                    For interview requests, data access, and press kits.
                  </p>
                  <a
                    href="mailto:press@creatorcharts.org"
                    className="inline-block border-b border-[#e4e4e7] text-base font-semibold leading-[25.6px] text-[#09090b] hover:border-[#09090b]"
                  >
                    press@creatorcharts.org
                  </a>
                </div>
              </div>

              {/* Partnerships */}
              <div className="flex gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f4f4f5]">
                  <Users className="h-6 w-6 text-[#09090b]" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold leading-8 text-[#09090b]">
                    Partnerships
                  </h3>
                  <p className="text-base leading-[25.6px] text-[#52525b]">
                    For API access, brand partnerships, and integrations.
                  </p>
                  <a
                    href="mailto:partners@creatorcharts.org"
                    className="inline-block border-b border-[#e4e4e7] text-base font-semibold leading-[25.6px] text-[#09090b] hover:border-[#09090b]"
                  >
                    partners@creatorcharts.org
                  </a>
                </div>
              </div>
            </div>

            {/* Office */}
            {/* <div className="space-y-4 pt-8">
              <h3 className="text-xl font-semibold leading-8 text-[#09090b]">
                Office
              </h3>
              <div className="text-lg leading-[28.8px] text-[#09090b]">
                <p>CreatorCharts HQ</p>
                <p>1200 Broadway, Suite 400</p>
                <p>New York, NY 10001</p>
              </div>
            </div> */}
          </div>

          {/* Right Side - Contact Form */}
          <div className="flex-1">
            <div className="rounded-2xl border border-[#e4e4e7] bg-white p-8 shadow-sm lg:p-8">
              <h3 className="mb-6 text-xl font-semibold leading-8 text-[#09090b]">
                Send us a message
              </h3>

              <form onSubmit={handleSubmit(onSubmit)}>
                <FieldGroup>
                  {/* First Name & Last Name */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <Field data-invalid={!!errors.firstName}>
                      <FieldLabel htmlFor="contact-firstName">
                        First Name
                      </FieldLabel>
                      <Input
                        id="contact-firstName"
                        {...register("firstName")}
                        // placeholder="Jane"
                        disabled={isSubmitting}
                      />
                      <FieldError>{errors.firstName?.message}</FieldError>
                    </Field>

                    <Field data-invalid={!!errors.lastName}>
                      <FieldLabel htmlFor="contact-lastName">
                        Last Name
                      </FieldLabel>
                      <Input
                        id="contact-lastName"
                        {...register("lastName")}
                        // placeholder="Doe"
                        disabled={isSubmitting}
                      />
                      <FieldError>{errors.lastName?.message}</FieldError>
                    </Field>
                  </div>

                  {/* Email */}
                  <Field data-invalid={!!errors.email}>
                    <FieldLabel htmlFor="contact-email">
                      Email Address
                    </FieldLabel>
                    <Input
                      id="contact-email"
                      {...register("email")}
                      type="email"
                      // placeholder="jane@example.org"
                      disabled={isSubmitting}
                    />
                    <FieldError>{errors.email?.message}</FieldError>
                  </Field>

                  {/* Subject */}
                  <Field data-invalid={!!errors.subject}>
                    <FieldLabel htmlFor="contact-subject">Subject</FieldLabel>
                    <Controller
                      name="subject"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={isSubmitting}
                        >
                          <SelectTrigger id="contact-subject">
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent>
                            {SUBJECT_OPTIONS.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <FieldError>{errors.subject?.message}</FieldError>
                  </Field>

                  {/* Message */}
                  <Field data-invalid={!!errors.message}>
                    <FieldLabel htmlFor="contact-message">Message</FieldLabel>
                    <Textarea
                      id="contact-message"
                      {...register("message")}
                      // placeholder="How can we help you?"
                      rows={6}
                      disabled={isSubmitting}
                    />
                    <FieldError>{errors.message?.message}</FieldError>
                  </Field>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </FieldGroup>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
