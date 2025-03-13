function CompactFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#003f87] text-white text-center py-4 mt-8">
            <p>© {currentYear} Indian Institute of Technology Jammu | Wellness Center</p>
        </footer>
    );
}

export default CompactFooter;
