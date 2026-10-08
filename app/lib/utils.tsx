// Utility functions for data formatting, validation, and common operations
export const formatDate = (date: string | number | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  export const truncateText = (text: string, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength).trim()}...`;
  };

  type PostFields = {
    title?: string;
    author?: string;
    content?: string;
  };
  
  export const validatePostData = (data: PostFields) => {
    const errors: Record<string, string> = {};
    
    if (!data.title?.trim()) {
      errors.title = 'Title is required';
    }
    
    if (!data.author?.trim()) {
      errors.author = 'Author is required';
    }
    
    if (!data.content?.trim()) {
      errors.content = 'Content is required';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };
  
  export const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };
  
  export const getPaginationInfo = (currentPage: number, totalPosts: number, postsPerPage: number) => {
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    const hasNextPage = currentPage < totalPages;
    const hasPrevPage = currentPage > 1;
    
    return {
      totalPages,
      hasNextPage,
      hasPrevPage,
      startIndex: (currentPage - 1) * postsPerPage,
      endIndex: Math.min(currentPage * postsPerPage, totalPosts)
    };
  };
  
  export const getSearchParams = (params: Record<string, string | number | undefined | null>) => {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value) searchParams.append(key, String(value));
    });
    
    return searchParams.toString();
  };
  
  type ApiErrorLike = {
    response?: {
      data?: { message?: string };
      status?: number;
    };
    message?: string;
  };

  export const handleApiError = (error: unknown) => {
    if (typeof error === 'object' && error !== null && 'response' in error) {
      const response = (error as ApiErrorLike).response;
      return {
        message: response?.data?.message || 'Server error occurred',
        status: response?.status || 500
      };
    }

    if (error instanceof Error) {
      return {
        message: error.message || 'An unexpected error occurred',
        status: 500
      };
    }
    
    return {
      message: 'An unexpected error occurred',
      status: 500
    };
  };
