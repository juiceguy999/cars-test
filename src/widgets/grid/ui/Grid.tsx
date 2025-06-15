import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Card } from "@/shared/ui";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationMeta {
  count: number;
  first_page_link: string;
  from: number;
  last_page: number;
  last_page_link: string;
  limit: number;
  page: number;
  prev_page_link?: string;
  next_page_link?: string;
  to: number;
  total: number;
  total_no_filters: number;
}

interface ApiResponse {
  data: any[];
  meta: PaginationMeta;
}

type SortOrder = 'unsorted' | 'asc' | 'desc';

export const Grid: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>('unsorted');

  useEffect(() => {
    const pageFromUrl = parseInt(searchParams?.get('page') || '1');
    const sortFromUrl = searchParams?.get('sort');
    const orderFromUrl = searchParams?.get('order');
    
    setCurrentPage(pageFromUrl);
    
    if (sortFromUrl === 'price' && orderFromUrl === 'asc') {
      setSortOrder('asc');
    } else if (sortFromUrl === 'price' && orderFromUrl === 'desc') {
      setSortOrder('desc');
    } else {
      setSortOrder('unsorted');
    }
  }, [searchParams]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const fetchCars = async (page: number, sort: SortOrder) => {
    try {
      let url = `https://testing-api.ru-rating.ru/cars?_limit=12&_page=${page}`;
      
      if (sort === 'asc') {
        url += '&_sort=price&_order=asc';
      } else if (sort === 'desc') {
        url += '&_sort=price&_order=desc';
      }

      const res = await fetch(url);

      if(!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const data: ApiResponse = await res.json();

      setCars(data.data);
      setMeta(data.meta);
      console.log(data)
    } catch(error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCars(currentPage, sortOrder);
  }, [currentPage, sortOrder])

  const handlePageChange = (page: number) => {
    if(page >= 1 && page <= (meta?.last_page || 1)) {
      setCurrentPage(page);

      const params = new URLSearchParams(searchParams?.toString());
      params.set('page', page.toString());

      router.push(`${pathname}?${params.toString()}`);
    }
  }

  const handleSortChange = (newSort: SortOrder) => {
    setSortOrder(newSort);
    setCurrentPage(1);

    const params = new URLSearchParams(searchParams?.toString());
    params.set('page', '1');
    
    if (newSort === 'asc') {
      params.set('sort', 'price');
      params.set('order', 'asc');
    } else if (newSort === 'desc') {
      params.set('sort', 'price');
      params.set('order', 'desc');
    } else {
      params.delete('sort');
      params.delete('order');
    }

    router.push(`${pathname}?${params.toString()}`);
  }

  const generatePageNumbers = () => {
    if(!meta) return [];

    const {page: current, last_page: total} = meta;

    if (isMobile) {
      const pages = [];

      if (current === 1) {
        pages.push(1, 2, 3);
        if (total > 3) {
          pages.push('...');
        }
      } else if (current === 2) {
        pages.push(1, 2, 3);
        if (total > 3) {
          pages.push('...');
        }
      } else if (current === 3) {
        pages.push('...', 3, '...');
      } else if (current === total) {
        pages.push('...');
        if (total > 2) pages.push(total - 2);
        if (total > 1) pages.push(total - 1);
        pages.push(total);
      } else if (current === total - 1) {
        pages.push('...');
        if (total > 2) pages.push(total - 2);
        pages.push(total - 1, total);
      } else {
        pages.push('...', current, '...');
      }

      return pages;
    } else {
      const pages = [];

      pages.push(1);

      if(current > 4) {
        pages.push('...');
      }

      const startPage = Math.max(2, current - 1);
      const endPage = Math.min(total - 1, current + 1);

      for(let i = startPage; i <= endPage; i++) {
        if(i !== 1 && i !== total) {
          pages.push(i)
        }
      }

      if(current < total - 3) {
        pages.push('...');
      }

      if(total > 1) {
        pages.push(total);
      };

      return pages;
    }
  }

  const shouldShowLeftChevron = () => {
    if (!isMobile) return true;
    return currentPage > 2;
  }

  const shouldShowRightChevron = () => {
    if (!isMobile) return true;
    if (!meta) return true;
    return currentPage < meta.last_page - 1;
  }

  return loading ? (<h1>Loading...</h1>) : (
    <section className="px-4 py-6 flex flex-col justify-between gap-6">

      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 border border-[#171717]/30 rounded-3xl max-w-fit mx-auto p-1.5">
          <button
            onClick={() => handleSortChange('unsorted')}
            className={`px-4 py-2 rounded-full text-sm cursor-pointer font-medium transition-colors ${
              sortOrder === 'unsorted'
                ? 'bg-[#171717]/5 text-[#171717]'
                : 'text-[#171717]/60 hover:text-[#171717]'
            }`}
          >
            Без сортировки
          </button>
          <button
            onClick={() => handleSortChange('asc')}
            className={`px-4 py-2 rounded-full text-sm cursor-pointer font-medium transition-colors ${
              sortOrder === 'asc'
                ? 'bg-[#171717]/5 text-[#171717]'
                : 'text-[#171717]/60 hover:text-[#171717]'
            }`}
          >
            По возрастанию
          </button>
          <button
            onClick={() => handleSortChange('desc')}
            className={`px-4 py-2 rounded-full text-sm cursor-pointer font-medium transition-colors ${
              sortOrder === 'desc'
                ? 'bg-[#171717]/5 text-[#171717]'
                : 'text-[#171717]/60 hover:text-[#171717]'
            }`}
          >
            По убыванию
          </button>
        </div>
      </div>

      <div className="container mx-auto">
        {cars.length === 0 ? (
          <p className='text-light'>No cars found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {cars.map((car)=>(
              <Card key={car.unique_id} car={car} />
            ))}
          </div>
        )}
      </div>

      {meta && meta.last_page > 1 && (
      <div className="container mx-auto">
        <nav className="flex items-center justify-center gap-2 border border-[#171717]/30 rounded-3xl max-w-fit mx-auto p-1.5">
          {shouldShowLeftChevron() && (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`w-10 h-10 rounded-md text-sm flex items-center justify-center ${
                currentPage === 1
                  ? 'cursor-not-allowed'
                  : 'text-[#171717] opacity-60 cursor-pointer'
              }`}
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>
          )}

          <div className="flex gap-1">
            {generatePageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' && handlePageChange(page)}
                disabled={page === '...'}
                className={`w-10 h-10 rounded-full cursor-pointer text-sm font-medium ${
                  page === currentPage
                    ? 'bg-[#171717]/5 text-[#171717]'
                    : page === '...'
                    ? 'text-[#171717]/30 cursor-not-allowed'
                    : 'text-[#171717]/60 hover:text-gray-900'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          {shouldShowRightChevron() && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === meta.last_page}
              className={`w-10 h-10 rounded-md text-sm flex items-center justify-center ${
                currentPage === meta.last_page
                  ? 'cursor-not-allowed'
                  : 'text-[#171717] cursor-pointer opacity-60'
              }`}
            >
              <FaChevronRight className="w-4 h-4" />
            </button>
          )}
        </nav>
      </div>
      )}
    </section>
  )
};