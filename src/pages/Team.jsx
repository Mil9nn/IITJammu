import { MessageCircle, Phone } from "lucide-react";

const counselors = [
    {
      name: "Himanshi Singh",
      role: "Clinical Psychologist",
      image: "/images/karunika.webp",
      email: "himanshi.singh@iitjammu.ac.in",
      phone: "+91 9797894944",
      description: "M.Phil in Clinical Psychology and experience at premier institutions like AIIMS, New Delhi. Specializes in psychological assessments and therapies for depression, anxiety, OCD, trauma, substance use, and relationship issues.",
      specialties: ["Depression", "Anxiety", "Trauma", "Relationship Counseling"]
    },
    {
      name: "Nandita Sharma",
      role: "Institute Counsellor",
      image: "/images/nandita.webp",
      email: "nandita.sharma@iitjammu.ac.in",
      phone: "+91 9033961612",
      description: "Extensive experience in academic research and practice across medical institutions, NGOs, and schools. Specializing in stress, self-esteem, relationship issues, addiction, trauma, LGBTQIA+ concerns, anger, and procrastination.",
      specialties: ["Stress Management", "Self-esteem", "Addiction", "LGBTQIA+ Support"]
    }
];

// Student Members data - add actual details when available
const studentMembers = [
    {
      name: "Student Member 1",
      role: "Student Representative",
      image: "/images/student1.webp",
      email: "student1@iitjammu.ac.in",
      description: "Brief description of student member's role and contributions to the Medical Centre."
    },
    {
      name: "Student Member 2",
      role: "Student Representative",
      image: "/images/student2.webp",
      email: "student2@iitjammu.ac.in",
      description: "Brief description of student member's role and contributions to the Medical Centre."
    }
    // Add more student members as needed
];

function Team() {
    return <>
        {/* Chairperson Section */}
        <div className="bg-gradient-to-r from-rose-50 to-amber-50 py-16 relative">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-rose-200 to-transparent"></div>

            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="md:w-1/3">
                        <div className="rounded-xl overflow-hidden shadow-lg mb-3">
                            <img
                                src="/images/chairperson.jpg"
                                alt="Medical Centre Chairperson"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        <a href="https://iitjammu.irins.org/profile/99351" className="text-2xl text-bold underline ml-1">Dr Sanat Kumar Tiwari</a>
                    </div>
                    <div className="md:w-2/3">
                        <h2 className="text-3xl font-bold text-indigo-600 mb-4">Message from the Chairperson</h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-amber-400 to-rose-400 mb-6 rounded-full"></div>
                        <div className="prose prose-lg text-gray-700">
                            <p className="italic font-medium mb-4">Dear IIT Jammu family,</p>
                            <p className="mb-3">
                                As you and your loved ones engage in important academic and personal pursuits on and around campus, 
                                we encourage you to maintain a healthy lifestyle. When care is needed, we are here to ensure that 
                                health and well-being are the least of your concerns while you make significant contributions to 
                                academics, research, and society.
                            </p>
                            <p className="mb-3">
                                The Medical Centre provides 24/7 support through doctor consultations, minor surgical procedures, 
                                medications, and regular laboratory testing. When specialized care is required, we facilitate 
                                transportation to the nearest specialized treatment facilities.
                            </p>
                            <p className="mb-3">
                                Our dedicated team is committed to providing exceptional medical care, ensuring you have a safe 
                                and healthy experience at IIT Jammu. We welcome you to contact us with any health-related 
                                concerns or questions.
                            </p>
                            <p className="mb-3">
                                To our esteemed colleagues, your continued cooperation and dedication play a vital role in 
                                maintaining a supportive environment for our students. Together, we can foster a community 
                                where everyone thrives.
                            </p>
                            <p className="font-medium">Best wishes for a healthy and productive future.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Counselors Section */}
        <div className="bg-gradient-to-r from-rose-50 to-amber-50 py-16 relative">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-rose-200 to-transparent"></div>

            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-indigo-600 mb-2">Our Counselors</h2>
                    <div className="h-1 w-20 bg-gradient-to-r from-amber-400 to-rose-400 mx-auto mb-4 rounded-full"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto mt-4">
                        Meet the dedicated professionals who oversee our wellness services and ensure we provide the highest quality care to the IIT Jammu community.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    {counselors.map((counselor, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group"
                        >
                            <div className="relative">
                                <img
                                    src={counselor.image}
                                    alt={counselor.name}
                                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className={`absolute top-4 right-4 ${'bg-[#f6eeee] text-blue-400'} px-3 py-1 rounded-full text-sm font-medium`}>
                                    {counselor.role}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className={`text-2xl font-bold ${'text-[#3d3b3b]'} mb-2`}>{counselor.name}</h3>
                                <p className="text-gray-600 mb-4">{counselor.description}</p>
                                <div className="mb-4">
                                    <h4 className="font-semibold text-gray-700 mb-2">Specialties:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {counselor.specialties.map((specialty, idx) => (
                                            <span
                                                key={idx}
                                                className={`${'bg-[#f1eaea] text-blue-400'} px-2 py-1 rounded-full text-xs font-medium transition-transform duration-300 hover:scale-105`}
                                            >
                                                {specialty}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-6 space-y-3">
                                    <a
                                        href={`mailto:${counselor.email}`}
                                        className={`flex items-center text-gray-600 hover:${'text-amber-600'} transition-colors`}
                                    >
                                        <MessageCircle className="h-5 w-5 mr-2 text-blue-400" />
                                        {counselor.email}
                                    </a>
                                    <a href={`tel:${counselor.phone}`}
                                        className={`flex items-center text-gray-600 hover:${'text-amber-600'} transition-colors`}>
                                        <Phone className="h-5 w-5 mr-2 text-blue-400" />
                                        {counselor.phone}
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Student Members Section */}
        <div className="bg-gradient-to-r from-rose-50 to-amber-50 py-16 relative">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-rose-200 to-transparent"></div>

            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-indigo-600 mb-2">Students Team</h2>
                    <div className="h-1 w-20 bg-gradient-to-r from-amber-400 to-rose-400 mx-auto mb-4 rounded-full"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto mt-4">
                        Our student representatives work closely with the Medical Centre to ensure that student health needs are effectively addressed and communicated.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    {studentMembers.map((student, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group"
                        >
                            <div className="relative">
                                <img
                                    src={student.image}
                                    alt={student.name}
                                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute top-4 right-4 bg-[#f6efef] text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                                    {student.role}
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="text-xl font-bold text-amber-600 mb-2">{student.name}</h3>
                                <p className="text-gray-600 mb-4">{student.description}</p>
                                <a
                                    href={`mailto:${student.email}`}
                                    className="flex items-center text-gray-600 hover:text-amber-600 transition-colors"
                                >
                                    <MessageCircle className="h-5 w-5 mr-2 text-amber-500" />
                                    {student.email}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>
}

export default Team;