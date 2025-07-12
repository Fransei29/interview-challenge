"use client";

import Image from 'next/image';

interface HeroBannerProps {
  assignments: any[];
  getDynamicMessage: () => string;
}

export default function HeroBanner({ assignments, getDynamicMessage }: HeroBannerProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-5xl font-bold tracking-tight mb-4">
              MediCare
              <span className="text-blue-200"> Hub</span>
            </h1>
            <p className="text-2xl text-blue-100 mb-6 leading-relaxed font-semibold">
              Advanced patient care management system.
            </p>
            <p className="text-xl text-blue-100 mb-4 leading-relaxed">
              Streamline medication assignments, track treatment progress, and deliver exceptional healthcare outcomes.
            </p>
            <p className="text-lg text-blue-200 mb-8">
              {getDynamicMessage()}
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-white">{assignments.length}</div>
                <div className="text-blue-100 text-sm">Active Assignments</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-white">
                  {assignments.filter(a => a.remainingDays > 0).length}
                </div>
                <div className="text-blue-100 text-sm">Ongoing Treatments</div>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                {/* Company Logo */}
                <div className="absolute top-4 right-4">
                  <Image 
                    src="/assets/MedicareLogo.png" 
                    alt="MediCare Logo" 
                    width={100} 
                    height={100}
                    className="rounded-2xl"
                  />
                </div>
                <div className="text-center">
                  <div className="w-40 h-40 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center overflow-hidden">
                    <Image 
                      src="/assets/doctor.jpg" 
                      alt="Dr. Sarah Johnson" 
                      width={200} 
                      height={200}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Dr. Sarah Johnson</h3>
                  <p className="text-blue-100">Chief Medical Officer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 