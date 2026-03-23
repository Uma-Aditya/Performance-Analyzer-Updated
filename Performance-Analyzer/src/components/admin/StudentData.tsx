import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download, Filter } from 'lucide-react';
import { API_BASE_URL } from '../../config';

const StudentData = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [sections, setSections] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [yearFilter, setYearFilter] = useState('all');
  const [branchFilter, setBranchFilter] = useState('all');
  const [sectionFilter, setSectionFilter] = useState('all');
  const [performanceFilter, setPerformanceFilter] = useState('all');

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [studentRes, sectionRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/students?branch=${branchFilter}&year=${yearFilter}&section=${sectionFilter}`),
        fetch(`${API_BASE_URL}/api/sections`)
      ]);
      
      if (studentRes.ok) setStudents(await studentRes.json());
      if (sectionRes.ok) setSections(await sectionRes.json());
      
    } catch (err) {
      console.error("Failed to fetch data", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [branchFilter, yearFilter, sectionFilter]);

  const clearFilters = () => {
    setYearFilter('all');
    setBranchFilter('all');
    setSectionFilter('all');
    setPerformanceFilter('all');
    setSearchQuery('');
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPerformance = performanceFilter === 'all' || student.performance === performanceFilter;
    
    return matchesSearch && matchesPerformance;
  });

  const handleDownloadReport = () => {
    window.location.href = `${API_BASE_URL}/api/performance/weekly-digest`; 
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or roll..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2 w-full">
            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                <SelectItem value="1st Year">1st Year</SelectItem>
                <SelectItem value="2nd Year">2nd Year</SelectItem>
                <SelectItem value="3rd Year">3rd Year</SelectItem>
                <SelectItem value="4th Year">4th Year</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={branchFilter} onValueChange={setBranchFilter}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Branches</SelectItem>
                <SelectItem value="CSE">CSE</SelectItem>
                <SelectItem value="IT">IT</SelectItem>
                <SelectItem value="EEE">EEE</SelectItem>
                <SelectItem value="ECE">ECE</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sectionFilter} onValueChange={setSectionFilter}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sections</SelectItem>
                {sections.map(s => (
                  <SelectItem key={s.name} value={s.name}>{s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={performanceFilter} onValueChange={setPerformanceFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Performance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Performance</SelectItem>
                <SelectItem value="Excellent">Excellent</SelectItem>
                <SelectItem value="Good">Good</SelectItem>
                <SelectItem value="Average">Average</SelectItem>
                <SelectItem value="Below Average">Below Average</SelectItem>
              </SelectContent>
            </Select>

            {(yearFilter !== 'all' || branchFilter !== 'all' || sectionFilter !== 'all' || performanceFilter !== 'all' || searchQuery !== '') && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground h-9 px-3">
                  Reset
                </Button>
            )}
          </div>
        </div>
        
        <div className="flex gap-2 shrink-0">
            <Button 
                variant="outline"
                onClick={() => fetchData()} 
                className="flex items-center gap-2 h-9"
            >
                Refresh
            </Button>
            <Button 
                onClick={handleDownloadReport} 
                className="flex items-center gap-2 h-9 whitespace-nowrap"
            >
                <Download size={16} />
                Report
            </Button>
        </div>
      </div>
      
      <div className="bg-secondary/5 backdrop-blur-sm rounded-lg p-4 overflow-x-auto min-h-[400px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-48 space-y-4">
             <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
             <p className="text-muted-foreground animate-pulse">Loading student database...</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Roll Number</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Performance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-mono text-xs">{student.rollNumber}</TableCell>
                    <TableCell className="font-medium text-sm">{student.name}</TableCell>
                    <TableCell className="text-sm">{student.year}</TableCell>
                    <TableCell className="text-sm">{student.branch}</TableCell>
                    <TableCell className="text-sm">{student.section}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                        student.performance === 'Excellent' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                        student.performance === 'Good' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                        student.performance === 'Average' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                        student.performance === 'Below Average' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' :
                        'bg-red-500/10 text-red-500 border border-red-500/20'
                      }`}>
                        {student.performance}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12">
                     <div className="space-y-2">
                        <p className="text-lg font-medium">No Students Found</p>
                        <p className="text-muted-foreground max-w-xs mx-auto text-sm">Use the Bulk Import tab to upload your student list or check your filters.</p>
                     </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default StudentData;
